import React, { useState, useEffect } from 'react';
import { useDepartments } from '../useDepartments';
import { Cardiology, Cpr, FourByFour } from "healthicons-react-native/dist/outline";

const callIconMap = {
    "CHEST PAIN|HEART PROBLEMS": Cardiology,
    "CARDIAC ARREST|DEATH": Cpr,
    "MOTOR VEHICLE COLLISION (MVC)": FourByFour,
}

// Squares

// Cariology - Heart
// BurnUnit - Fire
// AccidentAndEmergency - Misc.
// Rheumatology - Bone/Crash
// Sonography - Baby
// PainManagement - CPR/Cardiac Arrest
// Respiratory - Diff Breathing

// Others

// HeartOrgan - Heart
// Burn - Burns
// FHIR - Structure Fire
// Sonogram - Baby
// SUV - Crash
// Joints - Bone
// Pain - CPR/Cardiac Arrest
// Skull - CPR/Cardiac Arrest
// CPR - CPR/Cardiac Arrest
// Pneumonia - Diff Breathing
// CoughingAlt - Diff Breathing
// Diabetes - Diabetic Emergency
// BloodDrop - Bleeding Emergencies
// Bacteria - Sick
// RuralClinic - Medical Facility Response

const callDetails = {
    "Incident": {
        "IncID": 75,
        "IncNumber": 6873,
        "JurisdictionNumber": 3,
        "ServiceNumber": 42,
        "ServiceID": 45,
        "IncDate": "2024-09-25T01:01:01.55",
        // "IncNature": "CHEST PAIN|HEART PROBLEMS",
        "IncNature": "MOTOR VEHICLE COLLISION (MVC)",
        // "IncNature": "CARDIAC ARREST|DEATH",
        "IncNatureCode": "ALS",
        "IncNatureCodeDesc": "ALS PRIORITY (ALS)",
        "Notes": "570, 16:30> 311 Responding\n580, 16:25> Call Dispatched",
        "Status": "OPEN",
        "Origin": "911"
    },
    "Address": {
        "StreetAddress": "275 E Main St",
        "AddressApartment": "IFO",
        "Town": "Bridgeport",
        "State": "CT",
        "ZipCode": "06608",
        "Latitude": 41.178435683035445, 
        "Longitude": -73.18194442701176,
        "County": "Fairfield",
        "Intersection1": "E MAIN ST",
        "Intersection2": "STRATFORD AVE",
        "LocationName": "Chipotle Mexican Grill",
        "WeatherCondition": "Foggy"
    },
    "Person": {
        "Name": "John Doe",
        "Age": 19,
        "Gender": "Female",
        "Statement": "BLOOD PRESSURE 56/41 - IN AND OUT OF CON",
        "Conscious": "No",
        "Breathing": "Yes",
        "CallBackNumber": "(223) 456-7890"
    },
    "Response": {
        "IncID": 75,
        "ResponseID": 75,
        "ServiceID": 45,
        "ServiceName": "DARIEN EMS",
        "Units": [
            {
                "Unit": 311,
                "Department": 'Darien EMS',
                "Dispatched": "2024-09-25T01:01:01.55",
                "Responding": "2024-09-25T01:02:02.55",
                "OnScene": "2024-09-25T01:10:10.55",
                "Transporting": "2024-09-25T01:25:01.55",
                "InService": "2024-09-25T02:00:01.55",
            },
            {
                "Unit": 315,
                "Department": 'Darien EMS Supv',
                "Dispatched": "2024-09-25T01:01:01.55",
                "Responding": "2024-09-25T01:03:03.15",
                "OnScene": "2024-09-25T01:11:11.55",
                "Transporting": null,
                "InService": "2024-09-25T02:10:01.55",
            },
            {
                "Unit": 310,
                "Department": 'Darien EMS',
                "Dispatched": "2024-09-25T01:01:01.55",
                "Responding": "2024-09-25T01:01:01.55",
                "OnScene": "2024-09-25T01:06:06.55",
                "Transporting": "2024-09-25T01:25:01.55",
                "InService": "2024-09-25T02:15:01.55",
            },
            {
                "Unit": 'NHT20',
                "Department": 'Noroton Heights Fire Department',
                "Dispatched": "2024-09-25T01:01:01.55",
                "Responding": "2024-09-25T01:08:08.55",
                "OnScene": "2024-09-25T01:12:12.55",
                "Transporting": null,
                "InService": "2024-09-25T01:01:01.55",
            },
            {
                "Unit": 'NFDE31',
                "Department": 'Noroton Fire Department',
                "Dispatched": "2024-09-25T01:01:01.55",
                "Responding": "2024-09-25T01:07:07.55",
                "OnScene": "2024-09-25T01:14:14.55",
                "Transporting": null,
                "InService": "2024-09-25T01:01:01.55",
            },
            {
                "Unit": 'DFDT43',
                "Department": 'Darien Fire Department',
                "Dispatched": "2024-09-25T01:01:01.55",
                "Responding": "2024-09-25T01:10:10.55",
                "OnScene": "2024-09-25T01:18:18.55",
                "Transporting": null,
                "InService": "2024-09-25T01:01:01.55",
            },
            {
                "Unit": 1514,
                "Department": 'Greenwich EMS',
                "Dispatched": "2024-09-25T01:15:15.55",
                "Responding": "2024-09-25T01:30:30.55",
                "OnScene": "2024-09-25T01:45:45.55",
                "Transporting": "2024-09-25T02:05:15.55",
                "InService": "2024-09-25T02:25:01.55",
            },
        ]
    }
}

export const useCallFeed = () => {
    const departments = useDepartments();
    const { CallThemes } = departments?.accountDetails;
    const {
        CriticalCallList,
        HighCallList,
        MediumCallList,
        LowCallList,
    } = CallThemes;

    const callColorSelector = (callAcuity, cardiacArrestCall, status) => {
        if (status === 'CLOSED') {
            return '#0000CD';
        } else if (CriticalCallList.includes(cardiacArrestCall)) {
            return '#8B0000';
        } else if (HighCallList.includes(callAcuity)) {
            return "#FF0000";
        } else if (MediumCallList.includes(callAcuity)) {
            return "#FF8C00";
        } else if (LowCallList.includes(callAcuity)) {
            return "#228B22";
        }
        return 'grey';
    };

    return {
        departments,
        callIconMap,
        callDetails,
        callColorSelector,
    }
}