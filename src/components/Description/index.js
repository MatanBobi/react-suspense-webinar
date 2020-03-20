import React, {useRef, useEffect, useState} from 'react';
import '../../vendors/fpsmeter.min';

const Description = () => {
    const fpsRef = useRef();
    const [minFps, setMinFps] = useState(60);
    const [isShowingMin, setIsShowingMin] = useState(false);

    useEffect(() => {
        const intervalCleaner = setInterval(() => {
            if (window.fpsHistory && window.fpsHistory[19] && isShowingMin) {
                for (let i = 0; i < window.fpsHistory.length; i++) {
                    if (window.fpsHistory[i] < minFps) {
                        setMinFps(window.fpsHistory[i].toFixed(2))
                    }
                }
            }
        }, 100);

        return (() => clearInterval(intervalCleaner))

    }, [setMinFps, minFps, isShowingMin]);

    useEffect(() => {
        const anchor = fpsRef.current;

        // eslint-disable-next-line no-undef
        const meter = new FPSMeter(anchor, {
            heat: true,
            graph: true
        });

        function tick() {
            meter.tick();
            requestAnimationFrame(tick);
        }

        tick();
    }, [fpsRef]);

    return (
      <div className="marketing">
          <div className="spacer"/>
          <div ref={fpsRef} className="fps"/>
          <div className='min-fps' onClick={() => {
              setIsShowingMin(prevValue => !prevValue)
          }}>
              {isShowingMin ? `Min: ${minFps}` : `Show Min FPS`}
          </div>
      </div>
    );
};

export default Description;