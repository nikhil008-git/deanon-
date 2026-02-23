'use client';
import React from 'react';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

function index() {
    return (
        <>
            <div className="relative hidden md:block h-screen w-screen overflow-hidden inset-0">


                <div className='relative hidden md:inset-0   md:block  h-100 md:h-screen md:w-screen '>
                    <ShaderGradientCanvas
                        style={{
                            width: '50%',
                            height: '100%',
                        }}
                        lazyLoad={undefined}
                        fov={undefined}
                        pixelDensity={1}
                        pointerEvents='none'
                    >
                        <ShaderGradient
                            animate='on'
                            type='sphere'
                            wireframe={false}
                            shader='defaults'
                            uTime={0}
                            uSpeed={0.3}
                            uStrength={0.3}
                            uDensity={0.8}
                            uFrequency={5.5}
                            uAmplitude={3.2}
                            positionX={-0.1}
                            positionY={0}
                            positionZ={0}
                            rotationX={0}
                            rotationY={130}
                            rotationZ={70}
                            color1='#73bfc4'
                            color2='#ff810a'
                            color3='#8da0ce'
                            reflection={0.4}
                            // View (camera) props
                            cAzimuthAngle={270}
                            cPolarAngle={180}
                            cDistance={0.5}
                            cameraZoom={15.1}
                            // Effect props
                            lightType='env'
                            brightness={0.8}
                            envPreset='city'
                            grain='on'
                            // Tool props
                            toggleAxis={false}
                            zoomOut={false}
                            hoverState=''
                            // Optional - if using transition features
                            enableTransition={false}
                        />
                    </ShaderGradientCanvas>
                </div>
                {/* Text Content */}
                <div className="relative z-10 flex h-full items-center px-20 z-">
                    <div>
                        <h1 className="text-6xl font-bold text-white">
                            Your Heading Here
                        </h1>
                        <p className="mt-4 text-lg text-white/80 max-w-lg">
                            Your description text goes here. This sits on top of the shader.
                        </p>
                    </div>
                </div>

            </div>
        </>
    );
}

export default index;
