import React, {Component} from 'react';

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
            <div style={{display: 'block', direction: 'ltr'}}>
                <ButterList {...props} />
            </div>
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
              items={props.episodes} itemComponent={EpisodeItem}/>
);

let EpisodeInfo = (props) => (
    <div className={style['episode-info-container']}>
        <div className={style['episode-info']}>
            <div className={style['episode-info-title']}>{props.title}</div>
            <div className={style['episode-info-number']}>{props.episode}</div>
            <div data-toggle="tooltip" data-placement="left"
                 title={i18n.__('Health Unknown')} className="fa fa-circle health-icon None"></div>
            <div data-toggle="tooltip" data-placement="left" title={i18n.__('Magnet link')} className="fa fa-magnet show-magnet-link"></div>
            <div className={style['episode-info-date']}>{props['first_aired']}</div>
            <div className={style['episode-info-description']}>{props.overview}</div>
        </div>
    </div>
)

export default class ShowInfo extends Component {
    constructor(props) {
        super(props);

        let torrents = []
        props.episodes.map((value) => {
            let season = value.season - 1;
            let episode = value.episode - 1;
            if (!torrents[season]) torrents[season] = [];
            torrents[season][episode] = value;
        });

        this.state = {
            torrents: torrents || [],
            season: 0,
            episode: 0
        }
    };

    render() {
        let episodes = this.state.torrents[this.state.season];
        return (
            <div className={style.info}>
                <SeasonList  className={style.seasons}
                             torrents={this.state.torrents}
                             onClick={(o, i) => {this.setState({season: i})}}
                />
                <div className={style.episodes}>
                <EpisodeList className={style.episodesList}
                             episodes={episodes}
                             onClick={(o) => {this.setState({episode: o.episode})}}/>
                    <div className={style['right-container']}>
                        <EpisodeInfo {...episodes[this.state.episode]}/>
                        <div className={style['play-now']}>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
