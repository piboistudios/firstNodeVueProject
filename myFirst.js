const http = require('http');
const port = process.argv[2] || 9000;
// see:
// http://adrianmejia.com/blog/2016/08/24/Building-a-Node-js-static-file-server-files-over-HTTP-using-ES6/
http.createServer(function (request, result) {
    // import the necessary packages
    
    const url = require('url');
    const fs = require('fs');
    const path = require('path');
    // you can pass the parameter in the command line. e.g. node static_server.js 3000
    
    console.log(request.method + ' ' + request.url);
    
    // extract the url path 
    const parsedUrl = url.parse(request.url);
    // let pathname be the parsed url's path name  (basically everything after the third slash including the third slash)
    // e.g. http://localhost:8080/Customer/Details?ID=whatever's parsed url's pathname is /Customer/Details?ID=whatever. 

    let pathname = '.' + parsedUrl.pathname;

    
    // define the mime types in a dictionary
    const mimeType = {
        '.ico': 'image/x-icon',
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.wav': 'audio/wav',
        '.mp3': 'audio/mpeg',
        '.svg': 'image/svg+xml',
        '.pdf': 'application/pdf',
        '.doc': 'application/msword',
        '.eot': 'appliaction/vnd.ms-fontobject',
        '.ttf': 'aplication/font-sfnt'
      };
    
    // if the file given by our parsed url's pathname
    fs.exists(pathname, (exist) => {
        // if the pathname doesn't exist
        if(!exist){
            // return 404 file or directory not found
            result.statusCode = 404;
            result.end('File ' + pathname +  'not found!');
            // done
            return;
        }
        
        // if the pathname is just a directory i.e. /Customer/Details
        if (fs.statSync(pathname).isDirectory()){
            // do the default behavior (or so I've observed) and instead fetch index.html in said directory, i.e. /Customer/Details/index.html
            // hopefully such an html file will have a form for the user to enter an ID
            pathname += '/index.html';
        }

        // finally start doing the file static file serving
        fs.readFile(pathname, (err, data) => {
            // if there's a file reading error
            if(err) {
                // return a 500 server-side error code
                result.statusCode = 500;
                result.end('Error getting file: ' + err + '.');
            }
            // if everything's fine and dandy
            else {
                // declare the extension using the path package to parse the pathname into a path object I'm guessing
                const ext = path.parse(pathname).ext;
                
                // set the content-type header based on the mimeType extension map.
                // if it's not in the map, render it as plain text
                result.setHeader('Content-type', mimeType[ext] || 'text/plain');
                // write the data then write a blank line
                result.end(data);
            }
        });
    
    });

}).listen(parseInt(port));

console.log('Server listening on port ' + port );