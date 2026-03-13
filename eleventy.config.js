module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");

  eleventyConfig.addFilter("getPlayer", function (players, slug) {
    return players.find((p) => p.slug === slug);
  });

  eleventyConfig.addFilter("getEpisode", function (episodes, num) {
    return episodes.find((e) => e.number === num);
  });

  eleventyConfig.addFilter("getCurrentTribe", function (episodes, slug) {
    const latestEp = episodes[episodes.length - 1];
    for (const tribe of latestEp.tribes) {
      if (tribe.players.some((p) => p.slug === slug && !p.eliminated)) {
        return tribe;
      }
    }
    return null;
  });

  return {
    pathPrefix: "/survivor/",
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
