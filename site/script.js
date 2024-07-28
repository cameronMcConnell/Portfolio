class CLICounter {
    constructor() {
        this.count = 0
    }

    incrementCount() {
        this.count++
    }

    getCount() {
        return this.count
    }
}

class CommandParser {
    constructor() {
        this.mainContainer = document.getElementById("main-container")
    }

    parseCommand(command) {
        switch(command) {
            case 'help':
                this.#executeHelp()
                break
            case 'projects':
                this.#executeProjects()
                break
            case 'about':
                this.#executeAbout()
                break
            case 'skills':
                this.#executeSkills()
                break
            case 'contact':
                this.#executeContact()
                break
            default:
                this.#executeDefault()
                break
        }
    }

    #executeHelp() {
        const helpHTML =
        `<div class="margin-bottom flex-column flex-row-gap">
            <p> Welcome to My Developer Portfolio CLI! </p>
            <p>This interface allows you to navigate and explore my projects and experience using command-line commands.</p>
            <p>Valid Commands:</p>
            <ul>
                <li><strong>help</strong>: Display this help message.</li>
                <li><strong>projects</strong>: Show a list of my projects.</li>
                <li><strong>about</strong>: Learn more about me.</li>
                <li><strong>skills</strong>: View my skill set.</li>
                <li><strong>contact</strong>: Find out how to get in touch with me.</li>
            </ul>
            <p>Type a command to get started.</p>
        </div>`

        this.mainContainer.insertAdjacentHTML('beforeend', helpHTML)

        const cliHTML = 
        `<div class="margin-bottom flex-row flex-col-gap">
            <p><strong>root:~</strong>$</p>
            <input class="command-line" type="text" maxlength="8">
        </div>`

        this.mainContainer.insertAdjacentHTML('beforeend', cliHTML)
    }

    #executeProjects() {

    }

    #executeAbout() {

    }

    #executeSkills() {

    }

    #executeContact() {

    }

    #executeDefault() {

    }
}

window.addEventListener('load', () => {

    const parser = new CommandParser()

    const counter = new CLICounter()

    let currentCli = document.getElementsByClassName('command-line')[0]
    
    currentCli.focus()
    currentCli.select()

    const handleEnterKeyOnInput = (e) => {
        if (e.key === 'Enter') {
            parser.parseCommand(currentCli.value)
            counter.incrementCount()
            currentCli.disabled = true
            currentCli = document.getElementsByClassName('command-line')[counter.getCount()]
            currentCli.select()
            currentCli.addEventListener('keyup', (e) => handleEnterKeyOnInput(e))
        }
    }

    currentCli.addEventListener('keyup', (e) => handleEnterKeyOnInput(e))
})