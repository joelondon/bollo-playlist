import React, { Component } from 'react'
import WaveSurfer from 'wavesurfer.js'

import {
  WaveformLayout,
  WaveformContainer,
  Wave,
  PlayButton
} from './Waveform.styled'

import { FiPlay, FiPause } from 'react-icons/fi'

class Waveform extends Component {
  state = {
    playing: false,
    hasError: false,
    ready: false
  }

  destroy = () => this.setState({ ready: false })

  ready = (isReady) => {
    this.setState({ ready: isReady })
  }

  stopPlay = () => {
    this.setState({ playing: false })
  }

  handlePlay = () => {
    this.setState({ playing: !this.state.playing })
    this.waveform.playPause()
  }

  componentDidMount() {
    const track = document.querySelector('#track' + this.props.url.substr(-8))
    this.waveform = WaveSurfer.create({
      barWidth: 3,
      cursorWidth: 1,
      container: '#waveform' + this.props.url.substr(-8),
      backend: 'MediaElement',
      height: 80,
      progressColor: '#2D5BFF',
      responsive: true,
      waveColor: '#EFEFEF',
      cursorColor: 'transparent'
    })
    this.waveform.load(track)

    this.waveform.on('ready', () => {
      const duration = this.waveform.getDuration()
      this.ready(true)
    })

    this.waveform.on('error', function (e) {
      console.warn(e)
    })

    this.waveform.on('finish', () => {
      this.stopPlay()
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.stopPlay()
      const track = document.querySelector('#track' + this.props.url.substr(-8))
      this.waveform.load(track)
    }
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }

    const { url, name } = this.props
    return (
      <>
        {url !== '' && (
          <WaveformLayout>
            <WaveformContainer>
              <PlayButton onClick={this.handlePlay}>
                {!this.state.playing ? (
                  <FiPlay  />
                ) : (
                  <FiPause />
                )}
              </PlayButton>
              {!this.state.ready ? (
                <div className="loader loader-bouncing is-active" />
              ) : (
                ''
              )}
              <Wave id={'waveform' + this.props.url.substr(-8)} />
              <audio id={'track' + url.substr(-8)} src={url} />
            </WaveformContainer>
          </WaveformLayout>
        )}
      </>
    )
  }
}

export default Waveform
