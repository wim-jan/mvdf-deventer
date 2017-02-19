function slugify(title) {
  return title.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

module.exports = (dato, root, i18n) => {

  root.createDataFile('site.yaml', 'yaml', dato.site.toMap());

  root.directory('./data', dir => {
    dato.singleInstanceItemTypes.forEach(itemType => {
      const item = dato.itemsOfType(itemType) ? dato.itemsOfType(itemType)[0] : null;
      if (item) {
        dir.createDataFile(`${itemType.apiKey}.yaml`, 'yaml', item.toMap());
      }
    });
  });

  dato.collectionItemTypes.forEach(itemType => {
    root.directory(`./content/${itemType.apiKey}/`, dir => {
      if (dato.itemsOfType(itemType)) {
        dato.itemsOfType(itemType).forEach(item => {
          if (item.title) {
            dir.createPost(`${slugify(item.title)}.md`, 'yaml', { frontmatter: item.toMap() });
          }
        });
      }
    });
  });
};