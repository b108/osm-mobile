({
	baseUrl: "../",
    include: ['main'],
	mainConfigFile: '../main.js',
	findNestedDependencies: true,
	paths: {
        EventBroker: "libs/event-broker",
	},
    optimize: 'uglify2',
    closure: {
        CompilationLevel: 'ADVANCED_OPTIMIZATIONS'
    },
    preserveLicenseComments: false,
    out:'../compressed/app-built.js',
    name: "libs/almond/almond.js",
    wrap: {
        start: "$(function() {",
        end: "});"
    }
})
