// fis.match('::packager', {
//   spriter: fis.plugin('csssprites')
// });

// fis.match('*', {
//   useHash: false
// });

// fis.match('*.js', {
//   optimizer: fis.plugin('uglify-js')
// });

// fis.match('*.css', {
//   useSprite: true,
//   optimizer: fis.plugin('clean-css')
// });

// fis.match('*.png', {
//   optimizer: fis.plugin('png-compressor')
// });
fis.match('*.js', {
    useHash: false
});
fis.match('*.css', {
    useHash: false
});
fis.match('*.png', {
    useHash: false});
fis.match('*', {
    useHash: false
});
fis.media('prod').match('*.js', {
    optimizer: fis.plugin('uglify-js')});
