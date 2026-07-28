import { icon } from '../../lib/assets.js';
import styles from './ToolCard.module.scss';

export default function ToolCard({ tool, savedTools, onToggleSaved }) {
  const isSaved = savedTools.includes(tool.name);

  return (
    <article className={`tool-card ${styles.card}`}>
      <div className="tool-card__header">
        <img
          src={icon(tool.icon)}
          alt={`${tool.name} logo`}
          className="tool-card__icon"
          height="28"
        />
        <div className="tool-card__meta">
          <h3 className="tool-card__title">{tool.name}</h3>
          <p className="tool-card__license">
            <span className="text--ascent">{tool.license}</span>
          </p>
        </div>
      </div>
      <div className="tool-card__description">
        <p>
          A reliable {tool.category.toLowerCase()} tool for everyday creative
          work.
        </p>
      </div>
      <div className="tool-card__actions">
        <div className="tool-card__primary-actions">
          <button
            className="tool-card__actions-icon-button"
            type="button"
            aria-label={`Like ${tool.name}`}
          >
            <img
              className="tool-card__actions-icon"
              src={icon('flat-color-icons_like.png')}
              alt=""
              width="28"
              height="28"
            />
          </button>
          <button
            className={`tool-card__actions-icon-button ${styles.saveButton}`}
            type="button"
            aria-label={`${isSaved ? 'Remove' : 'Save'} ${tool.name}`}
            aria-pressed={isSaved}
            onClick={() => onToggleSaved(tool.name)}
          >
            <img
              className="tool-card__actions-icon"
              src={icon('flat-folder-add-outline.png')}
              alt=""
              width="28"
              height="28"
            />
          </button>
        </div>
        <div className="tool-card__secondary-actions">
          <a href={tool.url} target="_blank" rel="noreferrer">
            Visit
          </a>
        </div>
      </div>
    </article>
  );
}
