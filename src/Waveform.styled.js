import styled from 'styled-components'

export const WaveformLayout = styled.div`
  display: flex;
  text-transform: lowercase;
  font-variant: 'small-caps';
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: '1px black';
  width: 100%;
  background: transparent;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif, 'Sans Serif',
    Icons;
`
export const WaveformContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100px;
  width: 100%;
  background: transparent;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif, 'Sans Serif',
    Icons;
`
export const Wave = styled.div`
  width: 100%;
  margin: 10px 1% 0;
  height: 90px;
`
export const PlayButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left:1px;
  width: 2rem;
  height: 2rem;
  background: none;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  /* border: 1px solid #eee; */
  &:hover {
    /* border: 1px solid #333; */
    /* background: #eee; */
  }
`
