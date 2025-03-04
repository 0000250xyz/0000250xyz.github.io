// Don't you love convoluted static sites? Me too!
const repo = "0000250xyz/0000250xyz.github.io";
const div = document.getElementById('dex');

fetch(`https://api.github.com/repos/${repo}/git/trees/main`)
  .then(response => response.json())
  .then(data => {
    if (data && data.tree) {
      data.tree.forEach(item => {
        if (item.type == 'tree') {
          folder = item.path;
          console.log(`fetching ting a ${item.path}...`)
          fetch(item.url)
          .then(response => response.json())
          .then(data => {
            if (data && data.tree) {
              data.tree.forEach(item => {
                const link = document.createElement('a');
                link.textContent = link.href = `${folder}/${item.path}`
                div.appendChild(link);
                div.appendChild(document.createElement('br'));
                console.log();
              
              })
            }
          })
        } else {
          const link = document.createElement('a');
          link.textContent = link.href = `${item.path}`
          div.appendChild(link);
          div.appendChild(document.createElement('br'));
        }
      });
    } else {
      console.error('Tree data not found in response:', data);
    }
  })
  .catch(err => console.error(err));