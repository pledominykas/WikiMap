// Node modules
const wiki_scrape = require('./wiki_scrape.js');

/*FindConnection('https://en.wikipedia.org/wiki/Kaunas_University_of_Technology',
'https://en.wikipedia.org/wiki/North_America', false, []);*/

async function FindConnection(from, to, onlyFirstParagraph, callback){
  let root = { parent: null, link: from, children:[] };
  let visited = [];
  let found = false;
  let paths = [];
  let checks = 0;

  await wiki_scrape.GetHyperlinks(root.link, onlyFirstParagraph).then((hyperlinks) => {
    hyperlinks.forEach((link) => {
      root.children.push({link: link, parent: root, children: []});
    });
  });

  let leafs = root.children;

  while(!found){
    let promises = [];
    leafs.forEach((leaf) => {
      if(leaf.link != to && !visited.includes(leaf.link)){
        promises.push(wiki_scrape.GetHyperlinks(leaf.link, onlyFirstParagraph));
        visited.push(leaf.link);
        checks++;
      }
      else if(leaf.link == to){
        paths.push(TraceBackPath(leaf));
        found = true;
      }
    });

    if(!found){
      await Promise.all(promises).then((articles) => {
        let newLeafs = [];
        articles.forEach((article, i) => {
          article.forEach((link, k) => {
            let newLeaf = {parent: leafs[i], link: link, children: []};
            leafs[i].children.push(newLeaf);
            newLeafs.push(newLeaf);
          });
        });
        leafs = newLeafs;
      });
    }
  }

  console.log(checks);
  console.log(paths);

  return paths;
}

function TraceBackPath(node){
  let path = [node.link];
  let parent = node.parent;
  while (parent != null){
    path.push(parent.link);
    parent = parent.parent;
  }
  return path;
}
