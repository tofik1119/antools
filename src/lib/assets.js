const iconAssets = import.meta.glob('../../icons/*', {
  eager: true,
  query: '?url',
  import: 'default',
});
const imageAssets = import.meta.glob('../../images/*', {
  eager: true,
  query: '?url',
  import: 'default',
});

export const icon = (name) => iconAssets[`../../icons/${name}`];
export const image = (name) => imageAssets[`../../images/${name}`];
