import React from 'react';

import ButterList from './List';
import style from './styl/show_detail.styl';

let SeasonItem = (props) => (
    <li className={style['tab-season']} data-tab={'season-' + props.key}>
        <a>{i18n.__('Season %s', props.key)}</a>
    </li>
);

let EpisodeItem = (props) => (
    <li className={style['tab-episode']} data-id={props.tvdb_id}>
        <a href="#" className={style['episodeData']}>
            <span>{props.episode}</span>
            <div>{props.title}</div>
        </a>
        <i className="fa fa-eye watched {props.watched}"></i>
    </li>
);

let ShowList = (props) => (
    <div className={props.className || style[props.type]}>
        <debug {...props}/>
        <div className={style['display-base-title']}>
            <div className={style[`episode-list-${props.type}`]}>{props.name}</div>
        </div>
        <div className={style[`tabs-${props.type}`]}>
            <ButterList {...props} />
        </div>
    </div>
);

let SeasonList = (props) => (
    <ShowList {...props}
              type="seasons" name={i18n.__('Seasons')}
              items={props.torrents} itemComponent={SeasonItem}/>
);

let EpisodeList = (props) => (
    <ShowList {...props}
              type="episodes" name={i18n.__('Episodes')}
              items={props.torrents} itemComponent={EpisodeItem}/>
);

export default (props) => (
    <div className={style.info}>
        <SeasonList  className={style.seasons} torrents={this.state.torrents}/>
        <div className={style.episodes}>
            <EpisodeList className={style.episodesList}
                         torrents={this.state.torrents}/>
            <div className={style['right-container']}>
                <div className={style['episode-info']}>
                    <div className={style['episode-info']}>
                        <div className={style['episode-info-title']}></div>
                        <div className={style['episode-info-number']}></div>
                        <div data-toggle="tooltip" data-placement="left"
                             title={i18n.__('Health Unknown')} className="fa fa-circle health-icon None"></div>
                        <div data-toggle="tooltip" data-placement="left" title={i18n.__('Magnet link')} className="fa fa-magnet show-magnet-link"></div>
                        <div className={style['episode-info-date']}></div>
                        <div className={style['episode-info-description']}></div>
                    </div>
                </div>
                <div className={style['play-now']}>
                </div>
            </div>
        </div>
    </div>
)
