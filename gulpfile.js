//require gulp libraray
const gulp = require('gulp');

//now this gulp libraray have smaller libraries builit in like for minifying css
//for converting sass to css
//for js there is another libraray


//requirng gulp-sass this library will convert the sass files into css
const sass = require('gulp-sass')(require('node-sass'))


//requring gulp-cssnano this libraray will convert the (converted sass file to css) css file to  one line code
//basically compres the css files
const cssnano=require('gulp-cssnano')


//another libarary which will help in renaming files to remove broser caching problem  lets say name
//of file is home.css it attach a hash like home_1334.css so that whenever it sent to browesr then browesr
//will not find in local storage and have to fetch from server so changes will reflect in page

const rev=require('gulp-rev');



//requing gulp library for minifying js 
const uglify=require('gulp-uglify-es').default;





//requiring gulp lib for image minification
const imagemin=require('gulp-imagemin');




//lib to clear/delte the assets folder
const del=require('del');





                    //now gulp  contains tasks which need to be created when we use gulp 


//first task minifying tasks we name it css   gulp.task(taskname,callback fxn)

gulp.task('css',function(done){
console.log("minifying css")

//gulp.src method tells the Gulp task what files to use for the task
//** means any folder within scss 
//* any  file inside scss with name .scss

gulp.src('./assets/scss/**/*.scss')
//the above file need to be pass to gulp sass module so we use pipe method 
//which sends files to gulp-sass module
.pipe(sass()) 

//now i send the above converted sass file in css to compression moudle (gulp-cssnano) 
.pipe(cssnano())

//now i need to send the output files to destination 
.pipe(gulp.dest('./assets/css'))


//now we need to add hash basiclaly naming of files 
//now after above line ./assets/css will have all css files init now adding hash to these files
gulp.src('./assets/**/*.css')

//sending the above files to  gulp rev module for adding hash to their names  (renaming)
.pipe(rev())

//sending the rename css files to destionation 
//here in the assets folder if css folder is presernt files goes to  there 
//otherwise css folder will be created first and files goes there
.pipe(gulp.dest('./public/assets'))

//i need to store a manifest 
//what is manifest  just like package.josn there is a file manifest and what does this manifest do
//it stores the map of hasing done on files for example
//{
//home.css: home_1232.css           
//profile.css:profile_43897.css
//}
//whenever my ejs file is refering to home.css it takes the originalfile  form map  basically 
//value of home.css from map and put there because iam renaming the files 

//here this rev.manifest will create rev-manifest.josn file haveing mapping 
.pipe(rev.manifest({

    //cwd is public because iam taking everything from public
    //this cwd if not defined properly default manifest file saves in main directory
  cwd:'public',
  
//if i have already manifest.json file present and i created new css file zoro.css then if i run 
//gulp css due to mrege true the  mapping of this zoro.css will done in existing manifest.json file
  merge:true  
}))  


//putting the created manifest in destination
//without this manifest.json is not creating but renamed files is saving in css folder
//when i put ./public manifest file saved in main
//wheni put   ./public/assets then file saved inside public
.pipe(gulp.dest('./public/assets'));

done();


})




///task 2 minifying js 

gulp.task('js',function(done){

console.log("minifying js");

gulp.src('./assets/**/*.js')          //any folder name js or file name js
.pipe(uglify())        //uglifyed
.pipe(rev())            //renaming
.pipe(gulp.dest('./public/assets'))    //saving renamed files in destination
.pipe(rev.manifest({
 cwd:'public',
 merge:true

}))
.pipe(gulp.dest('./public/assets'))

done();


})




//////////////gulp task 3

gulp.task('images',function(done){

console.log('compressing images');

gulp.src('./assets/images/**/*.+(png||jpg||gif||svg||jpeg)')
.pipe(imagemin())
.pipe(rev())
.pipe(gulp.dest('./public/assets/images'))
.pipe(rev.manifest({
 cwd:'public',
 merge:true

}))
.pipe(gulp.dest('./public/assets'))
done();


})





///gulp task 4  empty the public assets directory 
//whenever you are building project you need to clear previous build and build it from scratch 

gulp.task('clean:assets',function(done){

del.sync('./public/assets');
done();

})




//task 5 since all above tasks are needed to run independently i have created task called build
//which will run all four these serially 


gulp.task('build',gulp.series('clean:assets','css','js','images'),function(done){

console.log("building assets");
done();


})
