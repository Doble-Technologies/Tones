import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useCallFeed } from '../hooks/useCallFeed';
import { Platform, Linking, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import {
    PageHeader,
    PageFooter,
} from './generalHelpers.jsx';
import { Ionicons } from '@expo/vector-icons';
import ActionSheet from 'react-native-actions-sheet';

const DepartmentActionSheet = styled(ActionSheet)``;

export default function Incidents() {
    const actionSheetRef = useRef(null);
    const callFeed = useCallFeed();

    const {
        departments,
        callIconMap,
        callDetails,
        callColorSelector,
    } = callFeed;

    const {
        departmentTypeMap,
        accountDetails,
        deptList,
        setDeptList,
        selectedDepartment,
        setSelectedDepartment,
        updateSelectedDepartment,
        selectedDepartmentColorPicker,
    } = departments;

    const { Incident, Address, Person, Response } = callDetails;
    const { CallThemes, InitList } = accountDetails;
    const {
        IncID,
        IncNumber,
        JurisdictionNumber,
        ServiceNumber,
        ServiceID,
        IncDate,
        IncNature,
        IncNatureCode,
        IncNatureCodeDesc,
        Notes,
        Status,
        Origin,
    } = Incident;
    const {
        StreetAddress,
        AddressApartment,
        Town,
        State,
        ZipCode,
        Latitude,
        Longitude,
        County,
        Intersection1,
        Intersection2,
        LocationName,
        WeatherCondition,
    } = Address;
    const {
        Name,
        Age,
        Gender,
        Statement,
        Conscious,
        Breathing,
        CallBackNumber,
    } = Person;
    const {
        Units
    } = Response;
    const {
        CriticalCallList,
        HighCallList,
        MediumCallList,
        LowCallList,
    } = CallThemes;

    return (
        <React.Fragment>
            <PageHeader>
                <View 
                    style={{ 
                        flexDirection: 'column', 
                        height: 80, 
                        alignItems: 'center', 
                        justifyContent: 'flex-end',
                        paddingBottom: 7
                    }}
                >
                    <TouchableOpacity
                        style={{
                            borderRadius: 6,
                            elevation: 3,
                            backgroundColor: '#fff',
                            shadowOffset: { width: 0, height: 0 },
                            shadowColor: '#333',
                            shadowOpacity: .8,
                            shadowRadius: 2,
                            paddingHorizontal: 10,
                            paddingVertical: 2,
                        }}
                        onPress={() => {
                            actionSheetRef.current?.show();
                        }}
                    >
                        <Text 
                            style={{ 
                                color: selectedDepartmentColorPicker(selectedDepartment?.type), 
                                fontWeight: 600, 
                                fontSize: '14px' 
                            }}
                        >
                            {selectedDepartment?.deptAbv}
                        </Text>
                    </TouchableOpacity>
                </View>
            </PageHeader>
            <ScrollView>
                
            </ScrollView>
            <PageFooter>
                <View 
                    style={{ 
                        flexDirection: 'column', 
                        height: 100, 
                        alignItems: 'center', 
                        justifyContent: 'flex-start',
                        paddingTop: 7
                    }}
                />
            </PageFooter>
            <DepartmentActionSheet 
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
                                    onPress={() => {
                                        actionSheetRef.current?.hide();
                                        return updateSelectedDepartment(
                                            selectedDepartment?.deptId, 
                                            item?.deptId
                                        )
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text 
                                            style={{ 
                                                color: selectedDepartmentColorPicker(
                                                    item?.type
                                                ), 
                                                fontWeight: 600, 
                                                fontSize: '16px' 
                                            }}
                                        >
                                            {item?.dept}
                                        </Text>
                                        {item?.primary ? <Ionicons name="star" size={16} color="yellow" style={{ 
                                            paddingLeft: 20, 
                                            shadowColor: '#333', 
                                            shadowOffset: 1,
                                            shadowOpacity: 1, 
                                            shadowRadius: 6
                                        }} /> : null}
                                    </View>
                                    <Text>{`${item?.deptAbv} - ${departmentTypeMap[item?.type]}`}</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
            </DepartmentActionSheet>
        </React.Fragment>
    )
}