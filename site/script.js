class CommandParser {
    #cliCount
    #mainContainer
    
    constructor() {
        this.#cliCount = 0;
        this.#mainContainer = document.getElementById("main-container");
    }

    parseCommand(command) {
        switch(command) {
            case 'about':
                this.#executeAbout();
                break;
            case 'skills':
                this.#executeSkills();
                break;
            case 'experience':
                this.#executeExperience();
                break;
            case 'projects':
                this.#executeProjects();
                break;
            case 'education':
                this.#executeEducation();
                break;
            case 'contact':
                this.#executeContact();
                break;
            case 'clear':
                this.#executeClear();
                break;
            case 'help':
                this.#executeHelp();
                break;
            default:
                this.#executeDefault();
                break;
        }
    }

    getCliCount() {
        return this.#cliCount;
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
        </div>`;

        this.#mainContainer.insertAdjacentHTML('beforeend', aboutHTML);

        this.#appendCliToMainContainer();
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
        </div>`;

        this.#mainContainer.insertAdjacentHTML('beforeend', skillsHTML);

        this.#appendCliToMainContainer();
    }

    #executeExperience() {
        const experienceHTML = 
        `<div class="margin-bottom flex-column flex-row-gap">
            <p><strong>Experience 🛠️</strong></p>
            <ul>
                <li><strong>Moonbeam, Tempe, AZ: Senior Capstone Project</strong></li>
                <li>June 2023 - December 2023</li>
                <li>- Collaborated with the CEO and CTO of a neobank startup targeting U.S. military veterans, integrating military verification using AWS services.</li>
                <li>- Developed and deployed AWS Lambda functions in TypeScript and managed the development branch with Agile methodologies.</li>
                <li>- Utilized Notion for project management and conducted bi-weekly sprints to adapt to changing project requirements.</li>
            </ul>
            <ul>
                <li><strong>Arizona State University, Tempe, AZ: Computer Science Lead Tutor</strong></li>
                <li>August 2022 - December 2023</li>
                <li>- Assisted students with homework in various programming languages, including C/C++, Bash, Java, Scheme, and Prolog.</li>
                <li>- Conducted training sessions for fellow tutors on advanced topics like Red-Black Trees and Scheme.</li>
            </ul>
            <ul>
                <li><strong>Arizona State University, Tempe, AZ: Undergraduate Teaching Assistant</strong></li>
                <li>August 2023 - December 2023</li>
                <li>- Assisted over 50 students in CSE 450 (Analysis of Algorithms) with concepts like greedy algorithms, dynamic programming, network flows, divide and conquer, and approximation algorithms.</li>
                <li>- Prepared exam review sessions and assisted with grading homework and exams.</li>
                <li>- Developed skills in leadership, time management, communication, and teaching.</li>
            </ul>
        </div>`

        this.#mainContainer.insertAdjacentHTML('beforeend', experienceHTML);

        this.#appendCliToMainContainer();
    }

    async #executeProjects() {
        try {
            const projects = await this.#getPinnedGithubProjects();

            const nodes = projects.data.user.pinnedItems.nodes;

            this.#mainContainer.insertAdjacentHTML('beforeend', '<p><strong>Projects 🚧</strong></p>');

            let projectHTML = '<div class="margin-bottom flex-column flex-row-gap">';

            nodes.array.forEach(node => {
                projectHTML +=
                `<ul>
                    <li><strong>${node.name}</strong></li>
                    <li>- ${node.description}</li>
                    <li>- ${node.url}</li>
                </ul>`;
            });

            projectHTML += '</div>';

            this.#mainContainer.insertAdjacentHTML('beforeend', projectHTML);

            this.#appendCliToMainContainer();
        } catch (error) {
            console.error(error)
        }
    }

    #executeEducation() {
        const educationHTML = 
        `<div class="margin-bottom flex-column flex-row-gap">
            <p><strong>Education 🧑‍🎓</strong></p>
            <ul>
                <li><strong>B.S. Computer Science</strong></li>
                <li>August 2019 - December 2023</li>
                <li>Arizona State University, Tempe, AZ</li>
                <li>3.75 GPA</li>
            </ul>
        </div>`;

        this.#mainContainer.insertAdjacentHTML('beforeend', educationHTML);

        this.#appendCliToMainContainer();
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
        </div>`;

        this.#mainContainer.insertAdjacentHTML('beforeend', contactHTML);

        this.#appendCliToMainContainer();
    }

    #executeClear() {
        this.#cliCount = 0;

        this.#mainContainer.innerHTML = 
        `<div class="margin-bottom flex-row flex-col-gap">
            <p><strong>root:~</strong>$</p>
            <input class="command-line" type="text" maxlength="8">
        </div>`;
    }

    #executeHelp() {
        const helpHTML =
        `<div class="margin-bottom flex-column flex-row-gap">
            <p> Welcome to My Developer Portfolio CLI! 👋</p>
            <p>This interface allows you to navigate and explore my projects and experience using command-line commands.</p>
            <p>Valid Commands:</p>
            <ul>
                <li><strong>about:</strong> Learn more about me.</li>
                <li><strong>skills:</strong> View my skill set.</li>
                <li><strong>experience:</strong> See my work experience.</li>
                <li><strong>projects:</strong> Show a list of my projects.</li>
                <li><strong>education:</strong> Discover my academic background and qualifications.</li>
                <li><strong>contact:</strong> Find out how to get in touch with me.</li>
                <li><strong>help:</strong> Display this help message.</li>
                <li><strong>clear:</strong> Remove all previous output.</li>
            </ul>
            <p>Type a command to get started.</p>
        </div>`;

        this.#mainContainer.insertAdjacentHTML('beforeend', helpHTML);

        this.#appendCliToMainContainer();
    }

    #executeDefault() {
        const defaultHTML =
        `<div class="margin-bottom">
            <p>Invalid Command 😿</p>
        </div>`;

        this.#mainContainer.insertAdjacentHTML('beforeend', defaultHTML);

        this.#appendCliToMainContainer();
    }

    #appendCliToMainContainer() {
        const cliHTML = 
        `<div class="margin-bottom flex-row flex-col-gap">
            <p><strong>root:~</strong>$</p>
            <input class="command-line" type="text" maxlength="10">
        </div>`;

        this.#mainContainer.insertAdjacentHTML('beforeend', cliHTML);

        this.#cliCount++;
    }

    async #getPinnedGithubProjects() {
        try {
            const response = await fetch('https://cameronmcconnell.net/projects');

            const data = await response.json();

            return data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

window.addEventListener('load', () => {
    const parser = new CommandParser();

    let currentCli = document.getElementsByClassName('command-line')[0];
    
    currentCli.select();

    window.addEventListener('click', () => { currentCli.select(); });

    const handleEnterKeyOnInput = (event) => {
        if (event.key === 'Enter') {
            parser.parseCommand(currentCli.value);
            currentCli.disabled = true;
            currentCli.removeEventListener('keyup', handleEnterKeyOnInput);
            currentCli = document.getElementsByClassName('command-line')[parser.getCliCount()];
            currentCli.select();
            window.scrollTo(currentCli.offsetLeft, currentCli.offsetTop);
            currentCli.addEventListener('keyup', handleEnterKeyOnInput);
        }
    }

    currentCli.addEventListener('keyup', handleEnterKeyOnInput);
});