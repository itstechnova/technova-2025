const getFaqData = async () => {
  const totalFiles = 10;
  const files = Array.from({ length: totalFiles }, (_, i) => i + 1);

  const faqs = await Promise.all(
    files.map(async (i) => {
      const res = await fetch(`/textFiles/faq/${i}.md?t=${Date.now()}`); // cache-busting
      const text = await res.text();

      const [titleLine, ...bodyLines] = text.trim().split("\n");

      return {
        title: titleLine.replace(/^# ?/, ""),
        body: bodyLines.join("\n").trim(),
        flowerIndex: (i % 5) + 1,
      };
    })
  );

  return faqs;
};

export default getFaqData;
