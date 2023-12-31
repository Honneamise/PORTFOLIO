const json = `
{
    "YEARS" : [ 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009,
                2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019,
                2020, 2021, 2022 ],

    "Large Cap Equity" : [ -9.11, -11.89, -22.10, 28.68, 10.88, 4.91, 15.79, 5.49, -37.00, 26.47,
                            15.06, 2.11, 16.00, 32.39, 13.69, 1.38, 11.96, 21.83, -4.38, 31.49,
                            18.40, 28.71, -18.11 ],

    "Small Cap Equity" : [ -3.02, 2.49, -20.48, 47.25, 18.33, 4.55, 18.37, -1.57, -33.79, 27.17,
                            26.85, -4.18, 16.35, 38.82, 4.89, -4.41, 21.31, 14.65, -11.01, 25.52,
                            19.96, 14.82, -20.44 ],

    "Dev ex-U.S. Equity" : [ -13.37, -21.40, -15.80, 39.42, 20.38, 14.47, 25.71, 12.44, -43.56, 33.67,
                             8.95, -12.21, 16.41, 21.02, -4.32, -3.04, 2.75, 24.21, -14.09, 22.49,
                             7.59, 12.62, -14.29 ],

    "Emerging Market Equity" : [ -30.71, -2.61, -6.16, 55.82, 25.55, 34.00, 32.17, 39.38, -53.33, 78.51,
                                 18.88, -18.42, 18.23, -2.60, -2.19, -14.92, 11.19, 37.28, -14.57, 18.44,
                                18.31, -2.54, -20.09 ],

    "U.S. Fixed Income" : [ 11.63, 8.43, 10.26, 4.10, 4.34, 2.43, 4.33, 6.97, 5.24, 5.93,
                            6.54, 7.84, 4.21, -2.02, 5.97, 0.55, 2.65, 3.54, 0.01, 8.72,
                            7.51, -1.54, -13.01 ],

    "High Yeld" : [ -5.86, 5.28, -1.37, 28.97, 11.13, 2.74, 11.85, 1.87, -26.16, 58.21, 
                    15.12, 4.98, 15.81, 7.44, 2.45, -4.47, 17.13, 7.50, -2.08, 14.32,
                    7.11, 5.28, -11.19 ],

    "Glbl ex-U.S. Fixed" : [ -3.91, -3.75, 22.37, 19.36, 12.54, -8.65, 8.16, 11.03, 4.39, 7.53, 
                             4.95, 4.36, 4.09, -3.08, -3.09, -6.02, 1.49, 10.51, -2.15, 5.09,
                            10.11, -7.05, -18.70 ],

    "Real Estate" : [ 13.84, -3.81, 2.82, 40.69, 37.96, 15.35, 42.12, -7.39, -48.21, 37.13,
                      19.63, -6.46, 27.73, 3.67, 15.02, -0.79, 4.06, 10.36, -5.63, 21.91,
                      -9.04, 26.09, -25.10 ],
    
    "Cash Equivalent" : [ 6.18, 4.42, 1.78, 1.15, 1.33, 3.07, 4.85, 5.00, 2.06, 0.21,
                          0.13, 0.10, 0.11, 0.07, 0.03, 0.05, 0.33, 0.86, 1.87, 2.28,
                          0.67, 0.05, 1.46 ]
}

`;

const jsonData = JSON.parse(json);