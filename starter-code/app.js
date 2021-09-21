// LOAD INVOICES FROM JSON
let invoices;

function accessJSON() {
    let requestURL = './data.json';
    let request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        invoices = request.response;
        invoices.length > 0 ? $('.title-container p').text(`There ${invoices.length != 1 ? 'are' : 'is'} ${invoices.length} total invoice${invoices.length != 1 ? 's' : ''}`) : $('.title-container p').text('No invoices');
        loadInvoices(invoices);
    }
}

const addCommas = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function loadInvoices(invoices) {
    if (invoices.length <= 0) {
        let newInvoices = noInvoices();
        console.log(newInvoices);
        $('.invoices').html(newInvoices);
    }

    else {
        $('.invoices').removeClass('no-invoice-container');
        let newInvoices = invoices.map(obj => {
            let status = obj.status;
            status = status.charAt(0).toUpperCase() + status.slice(1);// CAPTIALIZES FIRST LETTER
    
            return `<article class="invoice" id="${obj.id}">
    
            <h3 class="invoice-id"><span class="pound">#</span>${obj.id}</h3>
    
            <p class="invoice-date">Due ${obj.paymentDue}</p>
    
            <p class="invoice-name">${obj.clientName}</p>
    
            <b class="invoice-amount"><span class="inner-amount">£${addCommas(obj.total)}</span></b>
    
            <div class="invoice-status ${obj.status}-status">
              <div></div>
              <p>${status}</p>
            </div>
    
            <img src="assets/icon-arrow-right.svg" alt="arrow-right" class="arrow-right" />
    
          </article>`;
        });

        $('.invoices').html(newInvoices);
        $('.info-back').click(toPageOne);
        $('.invoice').click(toPageTwo);
        
        if (currentTheme == 'dark') {
            darkTheme();
        }
    }
}

function noInvoices() {
    $('.invoices').addClass('no-invoice-container');

    return `<div class="no-invoices">

    <img src="assets/illustration-empty.svg" alt="invoices empty" />

    <h1>There is nothing here</h1>
    <p>Create a new invoice by clicking the<br><b>New Invoice</b> button and get started</p>

  </div>`;
}

$(document).ready(accessJSON);

// FILTER INVOICES

$('.filter-showing').click(() => {
    let dropdown = $('.dropdown');
    let filterArrow = $('.down-arrow');

    if (dropdown.css('display') == 'flex') {
        dropdown.css({'display': 'none'});
        filterArrow.css({'transform': 'rotate(0deg)'});
    }

    else {
        dropdown.css({'display': 'flex'});
        filterArrow.css({'transform': 'rotate(-180deg)'});
    }
});

function filterInvoices(invoices) {
    let draft = $('.draft-filter').is(':checked');
    let pending = $('.pending-filter').is(':checked');
    let paid = $('.paid-filter').is(':checked');

    let filters = [draft, pending, paid];
    let filterNames = ['draft', 'pending', 'paid'];
    let filteredInvoices = invoices;

    $('.title-container p').text(`There ${invoices.length != 1 ? 'are' : 'is'} ${invoices.length} total invoice${invoices.length != 1 ? 's' : ''}`);

    for (let i = 0; i < filters.length; i++) {
        if (filters[i]) {
            filteredInvoices = filteredInvoices.filter(obj => obj.status == filterNames[i]);
            $('.title-container p').text(`There ${filteredInvoices.length > 1 ? 'are' : 'is'} ${filteredInvoices.length} ${filterNames[i]} invoice${filteredInvoices.length > 1 ? 's' : ''}`);
        }
    }

    loadInvoices(filteredInvoices);
}

$('.checkbox-container').click(() => {
    filterInvoices(invoices);
});

// THEME SWITCHER
let currentTheme = 'light';

$('.theme-container button').click(() => {
    if (currentTheme == 'light') {
        $('.theme-container button').html('<img src="assets/icon-sun.svg" alt="sun" class="sun" />');
        darkTheme();
        currentTheme = 'dark';
    }

    else {
        $('.theme-container button').html('<img src="assets/icon-moon.svg" alt="moon" class="moon" />');
        lightTheme();
        currentTheme = 'light';
    }
});

const darkTheme = () => {
    $('body').css({'background-color': '#141625', 'color': 'white'});
    $('.invoice').css({'background-color': '#1E2139', 'color': 'white', 'box-shadow': 'none'});
    $('.draft-status').css({'color': 'white'});
    $('.draft-status div').css({'background-color': 'white'});
    $('.dropdown').css({'background-color': '#1E2139', 'color': 'white', 'box-shadow': '0px 2px 5px rgb(20, 20, 20)'});

    $('.info-top').css({'background-color': '#1E2139', 'box-shadow': 'none'});
    $('.info-main').css({'background-color': '#1E2139', 'box-shadow': 'none'});
    $('.info-total').css({'background-color': '#0C0E16'});
    $('.info-main-bottom b').css({'color': 'white'});
    $('.info-id h2').css({'color': 'white'});
    $('.info-main-money').css({'background-color': '#252945'});

    $('.edit-invoice').css({'background-color': '#1E2139'});
    $('.edit-invoice input').css({'background-color': '#252945', 'border': 'none', 'color': 'white'});
    $('.edit-invoice select').css({'background-color': '#252945', 'border': 'none', 'color': 'white'});
    $('.form-bottom').css({'background-color': '#1E2139', 'box-shadow': '0px -15px 200px #111111'});
    $('.add-form-item').css({'background-color': '#252945'});

    $('.confirm-delete').css({'background-color': '#1E2139'});
}

const lightTheme = () => {
    $('body').css({'background-color': '#F8F8F8', 'color': 'black'});
    $('.invoice').css({'background-color': 'white', 'color': 'black', 'box-shadow': '0px 2px 5px lightgray'});
    $('.draft-status').css({'color': '#373B53'});
    $('.draft-status div').css({'background-color': '#373B53'});
    $('.dropdown').css({'background-color': 'white', 'color': 'black', 'box-shadow': '0px 5px 10px rgb(228, 228, 228)'});

    $('.info-top').css({'background-color': 'white', 'box-shadow': '0px 2px 10px rgb(235, 235, 235)'});
    $('.info-main').css({'background-color': 'white', 'box-shadow': '0px 2px 10px rgb(235, 235, 235)'});
    $('.info-total').css({'background-color': '#252945'});
    $('.info-main-bottom b').css({'color': 'black'});
    $('.info-id h2').css({'color': 'black'});
    $('.info-main-money').css({'background-color': '#F8F8F8'});

    $('.edit-invoice').css({'background-color': 'white'});
    $('.edit-invoice input').css({'background-color': 'transparent', 'border': '1px solid #DFE3FA', 'color': 'black'});
    $('.edit-invoice select').css({'background-color': 'transparent', 'border': '1px solid #DFE3FA', 'color': 'black'});
    $('.form-bottom').css({'background-color': 'white', 'box-shadow': '0px -15px 200px rgb(230, 230, 230)'});
    $('.add-form-item').css({'background-color': '#F9FAFE'});

    $('.confirm-delete').css({'background-color': 'white'});
}

// CHANGE PAGE

const toPageOne = () => {
    $('.main-top').css({'display': 'flex'});
    $('.invoices').css({'display': 'block'});
    $('.info-back').css({'display': 'none'});
    $('.info-top').css({'display': 'none'});
    $('.info-main').css({'display': 'none'});
}

const toPageTwo = e => {
    let invoiceId;

    $('.main-top').css({'display': 'none'});
    $('.invoices').css({'display': 'none'});
    $('.info-back').css({'display': 'flex'});
    $('.info-top').css({'display': 'flex'});
    $('.info-main').css({'display': 'block'});

    if ($(e.target).attr('class') == 'invoice') {
        invoiceId = $(e.target).attr('id');
    }

    else if ($(e.target).parent().attr('class') != 'invoice-status paid-status' && $(e.target).parent().attr('class') != 'invoice-amount') {
        invoiceId = $(e.target).parent().attr('id');
    }

    else {
        invoiceId = $(e.target).parent().parent().attr('id');
    }

    $('.info-id h2').html('<span class="pound">#</span>' + invoiceId);

    for (let i = 0; i < invoices.length; i++) {
        if (invoices[i].id == invoiceId) {
            let chosenInvoice = invoices[i];

            $('.info-id p').text(chosenInvoice.description);
            $('.info-address').html(`${chosenInvoice.senderAddress.street}<br>${chosenInvoice.senderAddress.city}<br>${chosenInvoice.senderAddress.postCode}<br>${chosenInvoice.senderAddress.country}`);
            $('.invoice-date b').text(chosenInvoice.createdAt);
            $('.payment-due b').text(chosenInvoice.paymentDue);
            $('.bill-to b').text(chosenInvoice.clientName);
            $('.bill-to-address p').html(`${chosenInvoice.clientAddress.street}<br>${chosenInvoice.clientAddress.city}<br>${chosenInvoice.clientAddress.postCode}<br>${chosenInvoice.clientAddress.country}`);
            $('.info-main-right b').text(chosenInvoice.clientEmail);
            
            $('.info-top-left').html(`<p class="status-title">Status</p>

            <div class="invoice-status ${chosenInvoice.status}-status">
              <div></div>
              <p>${chosenInvoice.status.charAt(0).toUpperCase() + chosenInvoice.status.slice(1)}</p>
            </div>`)
            
            let rows = chosenInvoice.items.map(item => {
                return `<div class="row">

                <p class="row-item-1">${item.name}</p>
                <p class="row-item-2">${item.quantity}</p>
                <div>
                  <p class="row-item-3">£ ${item.price}</p>
                </div>
                <p class="row-item-4">£ ${item.total}</p>
    
              </div>`;
            });

            $('.info-main-money').html(`<div class="title-row">

            <p class="money-title money-item-name">Item Name</p>
            <p class="money-title money-quantity">QTY.</p>
            <p class="money-title money-price">Price</p>
            <p class="money-title money-total">Total</p>

          </div>

          ${rows.join(' ')}

          <div class="info-total">
            <p>Amount Due</p>
            <b>£ ${chosenInvoice.total}</b>
          </div>`);
        }
    }
}

// ADD INVOICE
function getCurrentDate() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    let today = year + "-" + month + "-" + day;    
    return today;
}

$('.shader').hide();

$('.button-primary').click(() => {
    $('.shader').show();
    $('.edit-invoice').css({'transform': 'translateX(0px)'});
    $('.edit-invoice h1').html(`New Invoice`);
    $('.form-bottom').html(`<button class="form-discard">Discard</button>

    <div class="form-bottom-right">

      <button class="save-draft">Save As Draft</button>
      <button class="save-send">Save & Send</button>

    </div>`);
    $('#date').attr('value', getCurrentDate()); // FOR SOME REASON THIS DOESN'T REALLY WORK
    $('.save-draft').click(e => {addInvoice(e, 'draft')});
    $('.save-send').click(e => {addInvoice(e, 'pending')});
    $('.form-discard').click(e => {
        e.preventDefault();
        clearForm();
    
        $('.edit-invoice').css({'transform': 'translateX(-600px)'});
        setTimeout(() => {
            $('.shader').hide();
        }, 400);
    });

    $('.form-bottom-right').css({'width': '52%'});
});

$('.shader').click(e => {
    if ($(e.target).attr('class') == 'shader') {
        $('.edit-invoice').css({'transform': 'translateX(-600px)'});
        setTimeout(() => {
            $('.confirm-delete').css({'display': 'none'});
            $('.shader').hide();
        }, 400);
    }
});

$('.add-form-item').click(e => {
    e.preventDefault();

    let prevHTML = $('.form-rows').html();
    $('.form-rows').html(prevHTML + `<div class="form-row-item">

    <input type="text" class="form-row-item-1" />
    <input type="number" class="form-row-item-2" />
    <input type="number" class="form-row-item-3" placeholder="0.00" />
    <p class="form-row-item-4">0.00</p>
    <img src="assets/icon-delete.svg" alt="delete icon" class="row-delete" />

  </div>`);

    currentTheme == 'light' ? lightTheme() : darkTheme();

    $('.row-delete').click(e => {
        $(e.target).parent().css({'display': 'none'});
    });
});

$('.edit-invoice').on('scroll', e => {
    let elem = $(e.currentTarget);
    if (elem[0].scrollHeight - elem.scrollTop() == (elem.outerHeight() - 0.5)) {
        $('.form-bottom').css({'box-shadow': 'none'});
    }

    else {
        currentTheme == 'light' ? $('.form-bottom').css({'box-shadow': '0px -15px 200px rgb(230, 230, 230)'}) : $('.form-bottom').css({'box-shadow': '0px -15px 200px #111111'});
    }
});

$('.save-draft').click(e => {addInvoice(e, 'draft')});
$('.save-send').click(e => {addInvoice(e, 'pending')});

function addInvoice(event, status) {
    event.preventDefault();
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let id = `${characters[Math.floor(Math.random() * characters.length)]}${characters[Math.floor(Math.random() * characters.length)]}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}${Math.floor(Math.random() * 9)}`
    let senderAddress = {
        street: $('#from-street').val(),
        city: $('#from-city').val(),
        postCode: $('#from-code').val(),
        country: $('#from-country').val()
    };

    let clientName = $('#name').val();
    let clientEmail = $('#email').val()

    let clientAddress = {
        street: $('#to-street').val(),
        city: $('#to-city').val(),
        postCode: $('#to-code').val(),
        country: $('#to-country').val()
    };

    let paymentDue = $('#date').val();
    let paymentTerms = parseInt($('#terms').val());
    let description = $('#description').val();

    invoices.unshift({
        id,
        createdAt: getCurrentDate(),
        paymentDue,
        description,
        paymentTerms,
        clientName,
        clientEmail,
        status,
        senderAddress,
        clientAddress,
        items: [],
        total: 0
    });

    $('.edit-invoice').css({'transform': 'translateX(-600px)'});
    setTimeout(() => {
        $('.shader').hide();
    }, 400);

    loadInvoices(invoices);
    clearForm();
}

// EDIT INVOICE
$('.edit-button').click(() => {
    let currentInvoiceId = $('.info-id h2').html().replace('<span class="pound">#</span>', ''); // GETS RID OF SPAN

    $('.shader').show();
    $('.edit-invoice').css({'transform': 'translateX(0px)'});
    $('.edit-invoice h1').html(`Edit <span class="pound">#</span>${currentInvoiceId}`);
    $('.form-bottom').html(`<div class="discard-replacement"></div>

    <div class="form-bottom-right">

      <button class="form-discard">Cancel</button>
      <button class="save-edit">Save Changes</button>

    </div>`);
    $('.save-edit').click(onEditSubmit);
    $('.form-discard').click(e => {
        e.preventDefault();
        clearForm();
    
        $('.edit-invoice').css({'transform': 'translateX(-600px)'});
        setTimeout(() => {
            $('.shader').hide();
        }, 400);
    });

    $('.form-bottom-right').css({'width': '45%'});

    for (let i = 0; i < invoices.length; i++) {
        if (currentInvoiceId == invoices[i].id) {
            $('#from-street').val(invoices[i].senderAddress.street);
            $('#from-city').val(invoices[i].senderAddress.city);
            $('#from-code').val(invoices[i].senderAddress.postCode);
            $('#from-country').val(invoices[i].senderAddress.country);

            $('#name').val(invoices[i].clientName);
            $('#email').val(invoices[i].clientEmail);

            $('#to-street').val(invoices[i].clientAddress.street);
            $('#to-city').val(invoices[i].clientAddress.city);
            $('#to-code').val(invoices[i].clientAddress.postCode);
            $('#to-country').val(invoices[i].clientAddress.country);

            $('#date').val(invoices[i].paymentDue);
            $('#terms').val(`Net ${invoices[i].paymentTerms} ${invoices[i].paymentTerms > 1 ? 'Days' : 'Day'}`);
            $('#description').val(invoices[i].description);
        }
    }
});

function onEditSubmit(e) {
    e.preventDefault();
    let currentInvoiceId = $('.info-id h2').html().replace('<span class="pound">#</span>', ''); // GETS RID OF SPAN
    console.log(currentInvoiceId);

    for (let i = 0; i < invoices.length; i++) {
        let senderAddress = {
            street: $('#from-street').val(),
            city: $('#from-city').val(),
            postCode: $('#from-code').val(),
            country: $('#from-country').val()
        };
    
        let clientName = $('#name').val();
        let clientEmail = $('#email').val()
    
        let clientAddress = {
            street: $('#to-street').val(),
            city: $('#to-city').val(),
            postCode: $('#to-code').val(),
            country: $('#to-country').val()
        };
    
        let paymentDue = $('#date').val();
        let paymentTerms = parseInt($('#terms').val());
        let description = $('#description').val();

        if (currentInvoiceId == invoices[i].id) {
            invoices[i] = {
                id: currentInvoiceId,
                createdAt: invoices[i].createdAt,
                paymentDue,
                description,
                paymentTerms,
                clientName,
                clientEmail,
                status: invoices[i].status,
                senderAddress,
                clientAddress,
                items: invoices[i].items,
                total: invoices[i].total
            };
        }

        $('.edit-invoice').css({'transform': 'translateX(-600px)'});
        setTimeout(() => {
            $('.shader').hide();
        }, 400);

        toPageTwo({target: $('#' + currentInvoiceId)});
        loadInvoices(invoices);
        setTimeout(clearForm, 500);
    }
}

function clearForm() {
    $('#from-street').val('');
    $('#from-city').val('');
    $('#from-code').val('');
    $('#from-country').val('');
    $('#name').val('');
    $('#email').val('');
    $('#to-street').val('');
    $('#to-city').val('');
    $('#to-code').val('');
    $('#to-country').val('');
    $('#date').val('');
    $('#terms').val('');
    $('#description').val('');
}

// DISCARD CHANGES

$('.form-discard').click(e => {
    e.preventDefault();
    clearForm();

    $('.edit-invoice').css({'transform': 'translateX(-600px)'});
    setTimeout(() => {
        $('.shader').hide();
    }, 400);
});

// MARK AS PAID

$('.paid-button').click(() => {
    let currentInvoiceId = $('.info-id h2').html().replace('<span class="pound">#</span>', ''); // GETS RID OF SPAN
    for (let i = 0; i < invoices.length; i++) {
        if (currentInvoiceId == invoices[i].id) {
            if (invoices[i].status != '') {
                invoices[i].status = 'paid';
            }
        }
    }

    toPageTwo({target: $('#' + currentInvoiceId)});
    loadInvoices(invoices);
});

// DELETE INVOICE

$('.delete-button').click(() => {
    $('.shader').show();
    $('.confirm-delete').css({'display': 'block'});
});

$('.cancel-delete').click(() => {
    $('.shader').hide();
    $('.confirm-delete').css({'display': 'none'});
});

$('.delete').click(() => {
    let currentInvoiceId = $('.info-id h2').html().replace('<span class="pound">#</span>', ''); // GETS RID OF SPAN

    $('.shader').hide();
    $('.confirm-delete').css({'display': 'none'});

    let invoiceIndex = invoices.findIndex(item => item.id == currentInvoiceId);
    invoices.splice(invoiceIndex, 1);

    toPageOne();
    loadInvoices(invoices);
});