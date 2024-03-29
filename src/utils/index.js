function adjustText(text) {
    const sentenceEndings = [".", "?", "!"];
  
    if (sentenceEndings.includes(text[text.length - 1])) {
      return text;
    } else {
      let lastEndingIndex = -1;
      for (let i = text.length - 2; i >= 0; i--) { 
        if (sentenceEndings.includes(text[i])) {
          lastEndingIndex = i + 1;
          break;
        }
      }

      return lastEndingIndex === -1 ? "" : text.substring(0, lastEndingIndex).trim();
    }
  }