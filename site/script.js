class CLICounter {
    #count

    constructor() {
        this.#count = 0
    }

    incrementCount() {
        this.#count++
    }

    resetCount() {
        this.#count = 0
    }

    getCount() {
        return this.#count
    }
}

class CommandParser {
    #counter
    #mainContainer
    
    constructor(counter) {
        this.#counter = counter
        this.#mainContainer = document.getElementById("main-container")
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
            case 'clear':
                this.#executeClear()
                break
            default:
                this.#executeDefault()
                break
        }
    }

    #executeHelp() {
        const helpHTML =
        `<div class="margin-bottom flex-column flex-row-gap">
            <p>Valid Commands:</p>
            <ul>
                <li><strong>help</strong>: Display this help message.</li>
                <li><strong>projects</strong>: Show a list of my projects.</li>
                <li><strong>about</strong>: Learn more about me.</li>
                <li><strong>skills</strong>: View my skill set.</li>
                <li><strong>contact</strong>: Find out how to get in touch with me.</li>
                <li><strong>clear</strong>: Remove all previous output.</li>
            </ul>
        </div>`

        this.#mainContainer.insertAdjacentHTML('beforeend', helpHTML)

        this.#appendCliToMainContainer()
    }

    #executeProjects() {
        this.#appendCliToMainContainer()
    }

    #executeAbout() {
        this.#appendCliToMainContainer()
    }

    #executeSkills() {
        this.#appendCliToMainContainer()
    }

    #executeContact() {
        this.#appendCliToMainContainer()
    }

    #executeClear() {
        this.#counter.resetCount()

        this.#mainContainer.innerHTML = 
        `<div class="margin-bottom flex-row flex-col-gap">
            <p><strong>root:~</strong>$</p>
            <input class="command-line" type="text" maxlength="8">
        </div>`
    }

    #executeDefault() {
        const defaultHTML =
        `<div class="margin-bottom">
            <p>Invalid Command (╯°□°)╯</p>
        </div>`

        this.#mainContainer.insertAdjacentHTML('beforeend', defaultHTML)

        this.#appendCliToMainContainer()
    }

    #appendCliToMainContainer() {
        const cliHTML = 
        `<div class="margin-bottom flex-row flex-col-gap">
            <p><strong>root:~</strong>$</p>
            <input class="command-line" type="text" maxlength="8">
        </div>`

        this.#mainContainer.insertAdjacentHTML('beforeend', cliHTML)

        this.#counter.incrementCount()
    }
}

window.addEventListener('load', () => {
    const counter = new CLICounter()

    const parser = new CommandParser(counter)

    let currentCli = document.getElementsByClassName('command-line')[0]
    
    currentCli.select()

    const handleEnterKeyOnInput = (e) => {
        if (e.key === 'Enter') {
            parser.parseCommand(currentCli.value)
            currentCli.disabled = true
            currentCli = document.getElementsByClassName('command-line')[counter.getCount()]
            currentCli.select()
            window.scrollTo(currentCli.offsetLeft, currentCli.offsetTop)
            currentCli.addEventListener('keyup', (e) => handleEnterKeyOnInput(e))
        }
    }

    currentCli.addEventListener('keyup', (e) => handleEnterKeyOnInput(e))
})