import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const departmentTypeMap = {
    EMS: 'Medical Services',
    Fire: 'Fire Department',
    Rescue: 'Fire & EMS'
}

const accountDetails = {
    "CallThemes" : {
        "CriticalCallList": [
            "CARDIAC ARREST|DEATH",
        ],
        "HighCallList": [
            "ALS"
        ],
        "MediumCallList": [
            "ALS-STANDARD",
            "BLS-PRIORITY"
        ],
        "LowCallList": [
            "BLS-STANDARD"
        ]
    },
    "InitList": [
        {
            deptId: 0,
            dept: 'Darien EMS',
            addDepts: [
                'Darien EMS Supv'
            ],
            deptAbv: 'DEMS',
            rank: 'Assistant Director',
            rankAbv: 'Asst. Director',
            type: 'EMS',
            primary: true,
            selected: true,
            supervisor: true,
            admin: true,
            hasVolunteer: true,
        },
        {
            deptId: 1,
            dept: 'Noroton Fire Department',
            deptAbv: 'NFD',
            rank: 'Lieutenant',
            rankAbv: 'Lt.',
            type: 'Fire',
            primary: false,
            selected: false,
            supervisor: true,
            admin: true,
            hasVolunteer: true,
        },
        {
            deptId: 2,
            dept: 'Stamford Fire Department',
            deptAbv: 'SFD',
            rank: 'Paramedic',
            rankAbv: 'EMT-P',
            type: 'Rescue',
            primary: false,
            selected: false,
            supervisor: false,
            admin: true,
            hasVolunteer: false,
        },
    ]
}

export const useDepartments = () => {
    const { InitList } = accountDetails;
    const [deptList, setDeptList] = useState(InitList);
    const [selectedDepartment, setSelectedDepartment] = useState(deptList?.find((dept) => {
        return dept?.primary;
    }));

    const updateSelectedDepartment = (currentSelectedId, newSelectedId) => {
        if (currentSelectedId !== newSelectedId) {
            setDeptList(deptList?.map((item) => {
                if (item?.selected) {
                    item.selected = false;
                }
                if (item?.deptId === newSelectedId) {
                    item.selected = true;
                }
                return item;
            }))
        }
    };

    const selectedDepartmentColorPicker = (deptartmentType) => {
        if (deptartmentType === 'Fire') {
            return '#FF0000';
        } else if (deptartmentType === 'EMS') {
            return '#FF8C00';
        } else if (deptartmentType === 'Rescue') {
            return '#0000CD';
        }
        return 'grey';
    };

    useEffect(() => {
        if (deptList) {
            setSelectedDepartment(deptList?.find((dept) => {
                return dept?.selected;
            }));
        }
    }, [deptList]);

    return {
        departmentTypeMap,
        accountDetails,
        deptList,
        setDeptList,
        selectedDepartment,
        setSelectedDepartment,
        updateSelectedDepartment,
        selectedDepartmentColorPicker
    }
}