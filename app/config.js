System.config({
  defaultJSExtensions: true,
  transpiler: "traceur",
  paths: {
    "app/*": "src/*.js",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "@uirouter/core": "npm:@uirouter/core@5.0.23",
    "angular": "github:angular/bower-angular@1.7.8",
    "angular-animate": "github:angular/bower-angular-animate@1.7.8",
    "angular-aria": "github:angular/bower-angular-aria@1.7.8",
    "angular-material": "github:angular/bower-material@master",
    "angular-messages": "github:angular/bower-angular-messages@1.7.8",
    "angular-ui-router": "github:angular-ui/angular-ui-router-bower@1.0.22",
    "css": "github:systemjs/plugin-css@0.1.37",
    "json": "github:systemjs/plugin-json@0.1.2",
    "text": "github:systemjs/plugin-text@0.0.4",
    "traceur": "github:jmcriffey/bower-traceur@0.0.93",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.93",
    "github:angular/bower-angular-animate@1.7.8": {
      "angular": "github:angular/bower-angular@1.7.8"
    },
    "github:angular/bower-angular-aria@1.7.8": {
      "angular": "github:angular/bower-angular@1.7.8"
    },
    "github:angular/bower-angular-messages@1.7.8": {
      "angular": "github:angular/bower-angular@1.7.8"
    },
    "github:angular/bower-material@master": {
      "angular": "github:angular/bower-angular@1.7.8",
      "angular-animate": "github:angular/bower-angular-animate@1.7.8",
      "angular-aria": "github:angular/bower-angular-aria@1.7.8",
      "angular-messages": "github:angular/bower-angular-messages@1.7.8",
      "css": "github:systemjs/plugin-css@0.1.37"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.5.0"
    },
    "github:jspm/nodelibs-buffer@0.1.1": {
      "buffer": "npm:buffer@5.2.1"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.10"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:jspm/nodelibs-vm@0.1.0": {
      "vm-browserify": "npm:vm-browserify@0.0.4"
    },
    "npm:@uirouter/core@5.0.23": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:assert@1.5.0": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "buffer": "github:jspm/nodelibs-buffer@0.1.1",
      "object-assign": "npm:object-assign@4.1.1",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "util": "npm:util@0.10.3"
    },
    "npm:buffer@5.2.1": {
      "base64-js": "npm:base64-js@1.3.0",
      "ieee754": "npm:ieee754@1.1.13"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:process@0.11.10": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "vm": "github:jspm/nodelibs-vm@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:vm-browserify@0.0.4": {
      "indexof": "npm:indexof@0.0.1"
    }
  }
});
