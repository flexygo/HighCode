declare namespace Rgb {
    interface Options {
        colors?: number;
        method?: number;
        boxSize?: number[];
        boxPxls?: number;
        initColors?: number;
        minHueCols?: number;
        dithKern?: string;
        dithDelta?: number;
        dithSerp?: boolean;
        palette?: string[];
        reIndex?: boolean;
        useCache?: boolean;
        cacheFreq?: number;
        colorDist?: string;
    }

}

//Methods
declare function RgbQuant(opts: Rgb.Options): void;