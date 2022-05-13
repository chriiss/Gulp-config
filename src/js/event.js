export class Event {
    eventClick() {
        document.querySelector('p').addEventListener('click', () => {
            alert("cool!");
        })
    }
}