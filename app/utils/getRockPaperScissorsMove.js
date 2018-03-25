export default () => {
    let options = ["rock", "paper", "scissors"]
    let choice = Math.floor(Math.random() * options.length)

    return options[choice]
}