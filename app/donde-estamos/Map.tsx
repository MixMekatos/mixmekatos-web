"use client";

import { Map, MapMarker, MarkerContent, MarkerPopup } from "@/app/components/ui/map";
import { MapPin } from "lucide-react";
import { useState } from "react";


export default function MapLocation() {
    const LONGITUD = -75.57
    const LATITUD = 6.22


    return (
        <>
            <Map center={[LONGITUD, LATITUD]} zoom={16} theme="light">
                <MapMarker
                    longitude={LONGITUD}
                    latitude={LATITUD}
                >
                    <MarkerContent>
                        <div className="cursor-move">
                            <MapPin
                                className="fill-white stroke-dark dark:fill-white"
                                size={28}
                            />
                        </div>
                    </MarkerContent>
                </MapMarker>
            </Map>
        </>
    )
}