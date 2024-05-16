const config = require("../../config");

module.exports = {
  Translate: async (text = "", lang = "", allLowerCase = false) => {
    let output;
    let wait_time = config.app?.Translate_Timeout;

    let reg = /<([^>]+)>/g;

    if (!translate) {
      console.warn("❌ No translation module detected! ❌");
      output = getUnchangedText(text);
      return output;
    }

    // Apparently doing this searches it without crashing. Damn
    !lang ? (lang = config.app?.lang) : (lang = lang);

    if (!text || !lang)
      throw new Error(
        "❌ You must provide a text and a language code to translate! ❌"
      );

    if (lang === "en") {
      output = getUnchangedText(text);
    } else {
      const arrayStr = text.split(reg);
      const translatedArray = await Promise.all(
        arrayStr.map(async (str, index) => {
          if (index % 2 == 0) {
            if (verifyLang(lang)) {
              try {
                let Tranlate_buff;

                if(wait_time){
                  const timeout = new Promise((resolve, reject) => {
                    setTimeout(() => {
                      reject(new Error('❗ TimeoutRaisedError: The Translation took too long to complete! Skipping... ❗'))}, wait_time);
                  })
                  Tranlate_buff = await Promise.race([translate(str, lang), timeout]);
                } else{
                  Tranlate_buff = await translate(str, lang);
                }

                if(!allLowerCase) return Tranlate_buff;
                return Tranlate_buff.toLowerCase();
              } catch (e) {
                return getUnchangedText(str);
              }
            } else {
              console.clear()

              const module = await import("chalk");
              chalk = module.default || module;

            genConfigError(chalk, 'app', 'lang', 
            `❌ An invalid language was inserted in the config file. Please check the language code! ❌
            \t\t\tchange the language code in the config.js file\n`);  
            }
          } else {
            return getUnchangedText(str);
          }
        })
      );
      output = translatedArray.join(" ");
    }

    return output;
  },

  GetTranslationModule: async () => {
    try {
      const module = await import("translate");
      translate = module.default || module;

      const chalk_module = await import("chalk");
      chalk = chalk_module.default || chalk_module;
    } catch (e) {
      throw new Error(
        `❌ The translate module could not load properly. Please contact an Developers ❌ \n\n\nError:${e}`
      );
    }
  },

  throwConfigError: (module, section = 'app', key = 'token', error = '') => {
    genConfigError(module, section, key, error)
  }
};

function verifyLang(lang) {
  const langs = ["af", "sq", "ar", "hy", "id", "eu", "be", "bn", "bg", "ca", "hr", "cs", "da", "nl", "en", "et", "fi", "fr", "gl", "ka", "de", "el", "gu", "he", "hi", "hu", "is", "id", "ga", "it", "ja", "kn", "ko", "lo", "la", "lv", "lt", "mk", "ms", "ml", "mt", "mr", "mn", "ne", "no", "fa", "pl", "pt", "ro", "ru", "sa", "sr", "si", "sk", "sl", "es", "sw", "sv", "ta", "te", "th", "tr", "uk", "ur", "vi", "cy", "yi", "zu"];
  return langs.includes(lang);
}

function getUnchangedText(text) {
  return text
    .replace(/<<@(\d+)>>/g, "<@$1>")
    .replace(/>/g, "")
    .replace(/</g, "")
    .replace(/@(\w+)/g, "<@$1>");
}

function genConfigError(chalk, dict = 'app', key = 'token', error = '') {
  try {
    let config = require("../../config");

    if(!config[dict]){
      throw new Error(`\n\n❌ The ${dict} object is incorrect or does not exist in the config file! ❌\n\n`);
    }
    if(!config[dict][key]){
      throw new Error(`\n\n❌ The ${key} key is incorrect or does not exist in the ${dict} object in the config file! ❌\n\n`);
    }

    (async() => {
      console.error(
        chalk.red(`\n
        ${error}\n`)
        + chalk.white(`${dict}: `) + chalk.magenta(`{`))

      for (let [k, v] of Object.entries(config[dict])) {
        console.error(
          chalk.green(`\t${k}: `) + 
          (k != key ? chalk.blue(`'${v}'`) : chalk.yellow(`> > >`) + chalk.red(`'${v}'`) + chalk.yellow(`< < <`))
        );
      }
      console.error(chalk.magenta(`},`))
      process.exit(1);
    })()
  } catch(e){
    console.error(e);
    process.exit(1);
  }
}