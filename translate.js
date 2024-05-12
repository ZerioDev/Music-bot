const config = require("./config");

module.exports = {
  Translate: async (text = "", lang = "", allLowerCase = false) => {
    let output;

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
          if (index % 2 === 0) {
            if (verifyLang(lang)) {
              try {
                if(!allLowerCase) return await translate(str, lang);
                return (await translate(str, lang)).toLowerCase();
              } catch (e) {
                return str;
              }
            } else {
              throw new Error(
                "❌ An invalid language was inserted in the config file. Please check the language code! ❌"
              );
            }
          } else {
            return getUnchangedText(str);
          }
        })
      );
      output = translatedArray.join("");
    }

    return output;
  },

  GetTranslationModule: async () => {
    try {
      const module = await import("translate");
      translate = module.default || module;
    } catch (e) {
      throw new Error(
        `❌ The translate module could not load properly. Please contact an Developers ❌ \n\n\nError:${e}`
      );
    }
  },
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
