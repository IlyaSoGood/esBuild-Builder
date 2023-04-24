const ESBuild = require('esbuild');
const path = require('path');
const config = require('./esbuild-config.js');

ESBuild.build(config)