// import dateLocale from 'date-fns/locale/en-US';
import {enUS} from 'date-fns/locale'

import { createBaseStringSet } from './createBaseStringSet';

const StringSetEn = createBaseStringSet({ dateLocale: enUS});

export default StringSetEn;
