import React, { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  PageHeader,
  StyledContainer,
} from './generalHelpers.jsx';
import ActionSheet from 'react-native-actions-sheet';

const typeMap = {
    EMS: 'Medical Services',
    Fire: 'Fire Department',
    Rescue: 'Fire & EMS'
}

const initList = [
    {
        deptId: 0,
        dept: 'Darien EMS',
        deptAbv: 'DEMS',
        rank: 'Assistant Director',
        rankAbv: 'Asst. Director',
        type: 'EMS',
        primary: true,
        selected: true,
        admin: true,
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
        admin: true,
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
        admin: true,
    },
]

export default function Landing() {
    const actionSheetRef = useRef(null);
    const [deptList, setDeptList] = useState(initList);
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

    useEffect(() => {
        if (deptList) {
            setSelectedDepartment(deptList?.find((dept) => {
                return dept?.selected;
            }));
        }
    }, [deptList])
  
    return (
      <React.Fragment>
        <PageHeader>
            <View style={{ flexDirection: 'column', height: 80, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 8 }}>
                <TouchableOpacity onPress={() => {
                    actionSheetRef.current?.show();
                }}>
                    <Text style={{ color: 'red', fontWeight: 600, fontSize: '16px' }}>{selectedDepartment?.deptAbv}</Text>
                </TouchableOpacity>
            </View>
        </PageHeader>
        <StyledContainer>
            <StatusBar style="dark" />
            <SafeAreaView />
        </StyledContainer>
        <ActionSheet 
            ref={actionSheetRef}
            gestureEnabled
            containerStyle={{
                height: "50%",
                width: "100%",
                backgroundColor: '#ECEDEE',
            }}
        >
            <View style={{ flexDirection: 'column', padding: 20 }}>
                {deptList?.map((item) => {
                    return (
                        <View style={{ padding: 2 }} key={item?.deptId}>
                            <TouchableOpacity 
                                style={{
                                    borderRadius: 6,
                                    elevation: 3,
                                    backgroundColor: item?.selected ? 'grey' : '#fff',
                                    shadowOffset: { width: 1, height: 1 },
                                    shadowColor: '#333',
                                    shadowOpacity: 0.3,
                                    shadowRadius: 2,
                                    marginHorizontal: 20,
                                    marginVertical: 6,
                                    padding: 10
                                }}
                                onPress={() => {return updateSelectedDepartment(selectedDepartment?.deptId, item?.deptId)}}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: 'black', fontWeight: 600, fontSize: '16px' }}>{item?.dept}</Text>
                                    {item?.primary ? <Ionicons name="star" size={16} color="yellow" style={{ 
                                        paddingLeft: 20, 
                                        shadowColor: '#333', 
                                        shadowOffset: 1,
                                        shadowOpacity: 1, 
                                        shadowRadius: 6
                                    }} /> : null}
                                </View>
                                <Text>{`${item?.deptAbv} - ${typeMap[item?.type]}`}</Text>
                            </TouchableOpacity>
                        </View>
                    );
                })}
            </View>
        </ActionSheet>
      </React.Fragment>
    );
  }