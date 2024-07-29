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
            <p> Welcome to My Developer Portfolio CLI! 👋</p>
            <p>This interface allows you to navigate and explore my projects and experience using command-line commands.</p>
            <p>Valid Commands:</p>
            <ul>
                <li><strong>help:</strong> Display this help message.</li>
                <li><strong>projects:</strong> Show a list of my projects.</li>
                <li><strong>about:</strong> Learn more about me.</li>
                <li><strong>skills:</strong> View my skill set.</li>
                <li><strong>contact:</strong> Find out how to get in touch with me.</li>
                <li><strong>clear:</strong> Remove all previous output.</li>
            </ul>
            <p>Type a command to get started.</p>
        </div>`

        this.#mainContainer.insertAdjacentHTML('beforeend', helpHTML)

        this.#appendCliToMainContainer()
    }

    #executeProjects() {
        this.#appendCliToMainContainer()
    }

    #executeAbout() {
        const aboutHTML = 
        `<div class="margin-bottom flex-column flex-row-gap">
            <p><strong>About Me 👨‍💻</strong></p>
            <p>
                I am a recent Computer Science graduate from Arizona State University 
                with a deep passion for technology and development. My journey has been 
                shaped by diverse experiences in collaborative environments where I've worked 
                on innovative projects. My background includes roles as a lead tutor and teaching 
                assistant, where I honed my skills in leadership and communication. I'm enthusiastic about 
                leveraging my knowledge and experience to contribute to forward-thinking tech companies 
                and exciting new challenges.
            </p>
        </div>`

        this.#mainContainer.insertAdjacentHTML('beforeend', aboutHTML)

        this.#appendCliToMainContainer()
    }

    #executeSkills() {
        const skillsHTML =
        `<div class="margin-bottom flex-column flex-row-gap">
            <p><strong>Skills 🥷</strong></p>
            <ul>
                <li><strong>Programming Languages:</strong> Java, JavaScript/TypeScript, C/C++, Python, Go, Rust</li>
                <li><strong>Web Development:</strong> HTML, CSS, SCSS, Tailwind CSS, React.js, React Native, Svelte</li>
                <li><strong>Tools & Technologies:</strong> npm, Pip, Cargo, MySQL, MongoDB, GraphQL, Git, Docker, Debian, Ubuntu, AWS, Agile</li>
            </ul>
        </div>`

        this.#mainContainer.insertAdjacentHTML('beforeend', skillsHTML)

        this.#appendCliToMainContainer()
    }

    #executeContact() {
        const contactHTML =
        `<div class="margin-bottom flex-column flex-row-gap">
            <p><strong>Contact Information 📨</strong></p>
            <ul>
                <li><strong>Email: </strong><a href="mailto:cameron.mcconne@gmail.com" target="_blank">cameron.mcconne@gmail.com</a></li>
                <li><strong>LinkedIn: </strong><a href="https://linkedin.com/in/cameron-mcconnell-704b17225" target="_blank">linkedin.com/in/cameron-mcconnell</a></li>
                <li><strong>GitHub: </strong><a href="https://github.com/cameronMcConnell" target="_blank">github.com/cameronMcConnell</a></li>
            </ul>
        </div>`

        this.#mainContainer.insertAdjacentHTML('beforeend', contactHTML)

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
            currentCli.removeEventListener('keyup', handleEnterKeyOnInput)
            currentCli = document.getElementsByClassName('command-line')[counter.getCount()]
            currentCli.select()
            window.scrollTo(currentCli.offsetLeft, currentCli.offsetTop)
            currentCli.addEventListener('keyup', handleEnterKeyOnInput)
        }
    }

    currentCli.addEventListener('keyup', handleEnterKeyOnInput)
})