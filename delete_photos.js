// Selector for Images and buttons
const ELEMENT_SELECTORS = { checkboxClass: '.R4HkWb', checkboxClass2: '.ckGgle', languageAgnosticDeleteButton: 'div[data-delete-origin] button', deleteButton: 'button[aria-label="Delete"]', confirmationButton: '#yDmH0d > div.VfPpkd-Sx9Kwc.cC1eCc.UDxLd.PzCPDd.V639qd.bvQPzd.oEOLpc.A9Uzve.VfPpkd-Sx9Kwc-OWXEXe-FNFY6c > div.VfPpkd-wzTsW.O4g5Md.iWO5td > div > div.VfPpkd-cnG4Wd.m5OsGf > div > div.VfPpkd-T0kwCb.IdSMxc > button.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.nCP5yc.AjY5Oe.LQeN7.kDryjd' }

// Time Configuration (in milliseconds)
const TIME_CONFIG = {
    delete_cycle: 3000,
    press_button_delay: 1000
};

const MAX_RETRIES = 1000;

let checkboxes;
let buttons = {
    deleteButton: null,
    confirmationButton: null
}

let deleteTask = setInterval(async () => {
    do {
        let checkboxes1 = document.querySelectorAll(ELEMENT_SELECTORS['checkboxClass']);
        let checkboxes2 = document.querySelectorAll(ELEMENT_SELECTORS['checkboxClass2']);
        if(checkboxes1.length == 0)
            checkboxes = new Set([...checkboxes2])
        else checkboxes = new Set([...checkboxes1])
        await new Promise(r => setTimeout(r, 1000));
    } while (checkboxes.length <= 0);


    if (checkboxes.length <= 0) {
        console.log("[INFO] No more images to delete.");
        clearInterval(deleteTask);
        console.log("[SUCCESS] Tool exited.");
        return;
    }


    checkboxes.forEach((checkbox) => { checkbox.click() });
    console.log("[INFO] Deleting images");

    setTimeout(() => {
        try {
            buttons.deleteButton = document.querySelector(ELEMENT_SELECTORS['languageAgnosticDeleteButton']);
            buttons.deleteButton.click();
        } catch {
            buttons.deleteButton = document.querySelector(ELEMENT_SELECTORS['deleteButton']);
            buttons.deleteButton.click();
        }

        setTimeout(() => {
            buttons.confirmation_button = document.querySelector(ELEMENT_SELECTORS['confirmationButton']);
            buttons.confirmation_button.click();
        }, TIME_CONFIG['press_button_delay']);
    }, TIME_CONFIG['press_button_delay']);
}, TIME_CONFIG['delete_cycle']);
