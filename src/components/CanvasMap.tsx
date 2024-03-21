import { useEffect, useRef } from 'react';

export default function CanvasMap() {
	const canvas = useRef<HTMLCanvasElement>(null);
	
	useEffect(() => {
		if (!canvas.current) return
		
		canvas.current.draggable = true
		const context = canvas.current.getContext('2d')

		if (!context) return
		
		context.fillStyle = '#000000'
		context.fillRect(0, 0, 100, 100)
		
		context.fillStyle = '#'
	}, [])
	
	return <canvas className='w-screen h-screen' height='100%' width='100%' ref={canvas}></canvas>;
}