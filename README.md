# malcolmjs
Malcolm client and web gui written in reactjs

# Installing
In the root of this project directory, 
type "npm install" - go get some tea... 

The old instructions below are preserved for posterity and now managed 
automatically via NPM.

------------------------------------------------------------------------
# Installing (old instructions)

    git clone git@github.com:yousefmoazzam/react-panels.git
    git clone git@github.com:dls-controls/malcolmjs.git
    cd malcolmjs
    npm install react react-dom flux browserify reactify interact.js \
        object-assign react-addons-update react-addons-css-transition-group \
        react-modal react-sidebar react-toggle react-treeview less
    npm install ../react-panels
    rm -rf node_modules/react-panels/node_modules/react


# Building

Uses browserify and reactify to build bundle.js.
From the project root directory, use the following command to build bundle.js

    node_modules/.bin/browserify -t reactify ./js/app.js > bundle.js

