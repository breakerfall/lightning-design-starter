import {src, dest, watch as watchSrc, parallel, series} from 'gulp';
import del from 'del';
import pug from 'gulp-pug';
import concat from 'gulp-concat';

// Directories
const SRC_DIR = 'app/src';
const DIST_DIR = 'app/dist';

// Source Files
const CSS_GLOB = `${SRC_DIR}/**/*.css`;
const VIEWS_GLOB = `${SRC_DIR}/**/*.pug`;
const VIEWS_PARTIALS_GLOB = `${SRC_DIR}/**/_*.pug`;

// Clean DIST directory
export function clean() {
    return del([DIST_DIR]);
}

export function views() {
    return src([VIEWS_GLOB, `!${VIEWS_PARTIALS_GLOB}`], {base: SRC_DIR})
        .pipe(pug({pretty: true}))
        .pipe(dest(DIST_DIR))
}

export function styles() {
    return src([`./node_modules/@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css`, CSS_GLOB])
        .pipe(concat('css/main.css'))
        .pipe(dest(DIST_DIR))
}

export function watch() {
    watchSrc(VIEWS_GLOB, views);
    watchSrc(CSS_GLOB, styles);
}

const mainTasks = parallel(styles, views);
export const build = series(clean, mainTasks);
export const dev = series(clean, mainTasks, watch);

export default build;