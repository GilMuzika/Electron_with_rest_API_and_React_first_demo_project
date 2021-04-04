"use strict";
const { nativeImage, ipcRenderer } = require('electron');
const functionsLibrary = require('./functionsLibrary');

let titleNode = document.getElementsByTagName('title')[0];
let urlInTheBackend;

const allDroopdownItemsMap = new Map();
let addToallDroopdownItemsMap = (key, value) => {
    debugger;
    if(allDroopdownItemsMap !== undefined && allDroopdownItemsMap instanceof Map) {
        if(!allDroopdownItemsMap.has(key))
            allDroopdownItemsMap.set(key, value);
    }
};

// יש הרבה ממנו
const getAllAirlinesDropdownMenuItem = document.getElementById('get-all-airlines-dropdown-item_');
//
const getAllFlightsDropdownMenuItem = document.getElementById('get-all-flights-dropdown-item_');

const getAllCountriesDropdownMenuItem = document.getElementById('get-all-countries-dropdown-item_');

const getAllCustomersDropdownMenuItem = document.getElementById('get-all-customers-dropdown-item_');

const getAllJsonPlaceholderTodos = document.getElementById('get-all-jsonplaceholder-todos-dropdown-item_');



getAllJsonPlaceholderTodos.addEventListener('click', (e) => {
    urlInTheBackend = 'https://jsonplaceholder.typicode.com/todos/';
    functionsLibrary.dropDownItemEventListenerLogic(e, urlInTheBackend, constructOne);
});




getAllCustomersDropdownMenuItem.addEventListener('click', (e) => {
     urlInTheBackend = 'https://localhost:44361/api/LoggedInCustomerFacade/GetAllCustomers';
   functionsLibrary.dropDownItemEventListenerLogic(e, urlInTheBackend, prepareCustomerToConstruct);
});

getAllAirlinesDropdownMenuItem.addEventListener('click', (e) => {
     urlInTheBackend = 'https://localhost:44361/api/LoggedInAdministratorFacade/GetAllAirlineCompanies';
   functionsLibrary.dropDownItemEventListenerLogic(e, urlInTheBackend, prepareAirlineToConstruct);
});


getAllFlightsDropdownMenuItem.addEventListener('click', (e) => {
     urlInTheBackend = 'https://localhost:44361/api/AnonimousUserFacade/GetAllFlights';
   functionsLibrary.dropDownItemEventListenerLogic(e, urlInTheBackend, prepareFlightToConstruct);
});

getAllCountriesDropdownMenuItem.addEventListener('click', (e) => {
     urlInTheBackend = 'https://localhost:44361/api/AnonimousUserFacade/GetAllCountries';
   functionsLibrary.dropDownItemEventListenerLogic(e, urlInTheBackend, prepareCountryToConstruct);
});

let prepareFlightToConstruct = async (flight, isTableHeadBool) => {
    const newFlight = {};
    for(let s in flight) {
        if(s === 'Adorning') 
        newFlight['#'] = flight[s];
        if(s !== 'iD' && s !== 'StatusMessage' && s !== 'StatusColor' && s !== 'Adorning') {
            newFlight[s] = flight[s];
        }
    }
    return await constructOne(newFlight, isTableHeadBool);
};

let prepareCountryToConstruct = async (country, isTableHeadBool) => {
    const newCountry = {};
    for(let s in country) {
        if(s === 'Adorning') 
        newCountry['#'] = country[s];
        if(s !== 'iD' && s !== 'Adorning') {
            newCountry[s] = country[s];
        }
    }
    return await constructOne(newCountry, isTableHeadBool);
};

let prepareAirlineToConstruct = async (airline, isTableHeadBool) => {
    const newAirline = {};
    for(let s in airline) {
        if(s === 'Adorning') 
            newAirline['#'] = airline[s];
        if(s !== 'iD' && s !== 'Adorning') {
            newAirline[s] = airline[s];
        }
    }
    return await constructOne(newAirline, isTableHeadBool);
};

let prepareCustomerToConstruct = async (customer, isTableHeadBool) => {
    const newCustomer = {};
    for(let s in customer) {
        if(s === 'Adorning') 
            newCustomer['#'] = customer[s];
        if(s !== 'iD' && s !== 'Adorning') {
            newCustomer[s] = customer[s];
        }
    }
    return await constructOne(newCustomer, isTableHeadBool);
};



let constructOne = async (one, istableHeadBool) => {
    const tr = document.createElement('tr');
    for(let s in one) {
        debugger;
            if(typeof one[s] !== 'object') {
                //if(s !== 'iD' && s !== 'StatusMessage' && s !== 'StatusColor') {
                        const td = document.createElement('td');
                        const th = document.createElement('th');
                        td.setAttribute('class', 'standard-grid-table-cell');
                        th.setAttribute('class', 'standard-grid-table-cell');
                        

                            if(istableHeadBool) {
                                th.innerText = s;
                            } else {
                                if(s !== 'Image') {
                                td.innerText = one[s];
                                }
                                else {
                                    const img = document.createElement('img');
                                    let size = nativeImage.createFromDataURL(one[s]).getSize();
                                    td.setAttribute('width', size.width);
                                    img.setAttribute('src', one[s]);
                                    td.appendChild(img);
                                }
                            }


                        if(istableHeadBool)
                            tr.appendChild(th)
                        else
                            tr.appendChild(td);
                //}
            }

    }
    return tr;
 }; 


