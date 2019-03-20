// 复制页面
let gulp = require("gulp");
// let uglify = require('gulp-uglify');

gulp.task("copyhtml",async()=>{
    gulp.src("*.html").pipe(gulp.dest("D:\\phpStudy\\WWW\\huawei"));
});
gulp.task("copyimg",async()=>{
    gulp.src("img/**/*").pipe(gulp.dest("D:\\phpStudy\\WWW\\huawei\\img"));
});
gulp.task("copycss",async()=>{
    gulp.src("css/**/*").pipe(gulp.dest("D:\\phpStudy\\WWW\\huawei\\css"));
});
gulp.task("copyfont",async()=>{
    gulp.src("font/**/*").pipe(gulp.dest("D:\\phpStudy\\WWW\\huawei\\font"));
});
gulp.task("copyjs",async()=>{
    gulp.src("js/**/*").pipe(gulp.dest("D:\\phpStudy\\WWW\\huawei\\js"));
});
gulp.task("copyphp",async()=>{
    gulp.src("php/**/*").pipe(gulp.dest("D:\\phpStudy\\WWW\\huawei\\php"));
});
gulp.task("watchs",async ()=>{
	gulp.watch("*.html",gulp.series("copyhtml"));
	gulp.watch("js/**/*",gulp.series("copyjs"));
	gulp.watch("img/**/*",gulp.series("copyimg"));
    gulp.watch("css/**/*",gulp.series("copycss"));
    gulp.watch("font/**/*",gulp.series("copyfont"));
    gulp.watch("php/**/*",gulp.series("copyphp"));
});