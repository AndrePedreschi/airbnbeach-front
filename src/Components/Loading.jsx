import './Loading.scss'
import { RotatingLines } from 'react-loader-spinner'

export function Loading({ loading = true}) {

    return (
        <>
            {loading &&
                <div className='loading'>
                    <RotatingLines
                        strokeColor="#1dbeb4"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="96"
                        visible={true}
                    />
                </div>
            }
        </>
    )
}
