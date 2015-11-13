function ThemeService() {

    /*
    * Only enable this if you want to see all combinations
    * Since there are over 360 themes created, you will find some performance decrease on initial load
    * Suggest only enabling this to find your favorite theme and then choosing your theme and configuring 
    * it in the "themes.js" file
    */
    var ALL_COMBINATIONS = false;

    var defaultAccentColor = {label:'grey',color:'#9E9E9E'};

    var themes = [
        {label:'red',color:'#F44336'},
        {label:'pink',color:'#E91E63'},
        {label:'purple',color:'#9C27B0'},
        {label:'deep-purple',color:'#673AB7'},
        {label:'indigo',color:'#3F51B5'},
        {label:'blue',color:'#2196F3'},
        {label:'light-blue',color:'#03A9F4'},
        {label:'cyan',color:'#00BCD4'},
        {label:'teal',color:'#009688'},
        {label:'green',color:'#4CAF50'},
        {label:'light-green',color:'#8BC34A'},
        {label:'lime',color:'#CDDC39'},
        {label:'yellow',color:'#FFEB3B'},
        {label:'amber',color:'#FFC107'},
        {label:'orange',color:'#FF9800'},
        {label:'deep-orange',color:'#FF5722'},
        {label:'brown',color:'#795548'},
        defaultAccentColor,
        {label:'blue-grey',color:'#607D8B'}
    ];

    var themeCombinations = [];

    if(ALL_COMBINATIONS) {

        for (var primaryIndex = 0; primaryIndex < themes.length; ++primaryIndex) {

            for (var accentIndex = 0; accentIndex < themes.length; ++accentIndex) {
              
              if(themes[primaryIndex].label !== themes[accentIndex].label) {
                themeCombinations.push({
                    label:themes[accentIndex].label+'-'+themes[accentIndex].label+'-theme',
                    primary:themes[primaryIndex],
                    accent:themes[accentIndex]
                });
              }
              
            }

        }

    } else {

        for (var primaryIndex = 0; primaryIndex < themes.length; ++primaryIndex) {

            if(themes[primaryIndex].label !== defaultAccentColor.label) {
                themeCombinations.push({
                    label:themes[primaryIndex].label+'-'+defaultAccentColor.label+'-theme',
                    primary:themes[primaryIndex],
                    accent:defaultAccentColor
                });
            }

        }

    }
      
    return {
        all_combinations:ALL_COMBINATIONS,
        themes:themeCombinations
    };
}