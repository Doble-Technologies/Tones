import React, { useState, useRef, useEffect } from 'react';
import { useCallFeed } from '../hooks/useCallFeed';
import { Platform, Linking, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AccidentAndEmergency } from "healthicons-react-native/dist/outline";
import { Phone } from "healthicons-react-native/dist/filled";
import {
  PageHeader,
  PageFooter,
} from './generalHelpers.jsx';

export default function Landing() {
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
        selectedDepartment,
        setSelectedDepartment,
        updateSelectedDepartment,
        selectedDepartmentColorPicker,
    } = departments;

    const { Incident, Address, Person, Response } = callDetails;
    const { CallThemes } = accountDetails;
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

    const SelectedIcon = callIconMap[IncNature] || AccidentAndEmergency;

    const ownDepartmentResponse = Units?.map((unit) => {
        if (unit?.Department === selectedDepartment?.dept ||
        selectedDepartment?.addDepts?.includes(unit?.Department)) {
            return unit;
        }
        return null;
    })?.filter((filterItem) => {
        return filterItem;
    });

    const mutualAidDepartmentResponse = Units?.map((unit) => {
        if (unit?.Department !== selectedDepartment?.dept &&
        !selectedDepartment?.addDepts?.includes(unit?.Department)) {
            return unit;
        }
        return null;
    })?.filter((filterItem) => {
        return filterItem;
    });;

    const formatCallTimePast = (callValue) => {
        const initDate = new Date(callValue);
        const currentTime = new Date();

        const timeDifference = currentTime - initDate;

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        if (days && days !== 0) {
            return `${days} day${days === 1 ? '' : 's'} ago`;
        } else if (hours && hours !== 0) {
            return `${hours} hour${hours === 1 ? '' : 's'} ago`;
        } else if (minutes && minutes !== 0) {
            return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
        } else if (seconds && seconds !== 0) {
            return `${seconds} second${seconds === 1 ? '' : 's'} ago`;
        }
        return `Unknown Time Past`;
    }

    const formatCallDateTime = (callValue) => {
        const initDate = new Date(callValue);
        if (initDate) {
            const formattedDate = `${initDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            })}`;
            const hours = initDate.getHours().toString().padStart(2, '0');
            const minutes = initDate.getMinutes().toString().padStart(2, '0');
            const formattedTime = `${hours}:${minutes}`;

            return `${formattedDate} - ${formattedTime}`;
        }
        return 'Date Unavailable';
    }

    const formatResponseTimes = (time) => {
        if (time === null) {
            return '';
        }
        const initTime = new Date(time);
        const hours = initTime.getHours().toString().padStart(2, '0');
        const minutes = initTime.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const openMaps = (latitude, longitude) => {
        const daddr = `${latitude},${longitude}`;
        const company = Platform.OS === "ios" ? "apple" : "google";
        Linking.openURL(`http://maps.${company}.com/maps?daddr=${daddr}`);
    };

    const callNumber = (number) => {
        const formattedNumber = number.replace(/[()\-\s]/g, '');
        Linking.openURL(`tel:${formattedNumber}`);
    };
  
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
            <StatusBar style="dark" />
            <SafeAreaView />
            <View style={{ flexDirection: 'column', padding: 20 }}>
                <View key="callDateAndTime"
                    style={{ 
                        paddingBottom: 6, 
                        paddingLeft: 10, 
                        paddingRight: 10, 
                        flexDirection: 'row', 
                        justifyContent: 'space-between' 
                    }}
                >
                    <Text style={{ fontSize: 12 }}>{formatCallDateTime(IncDate)}</Text>
                    <Text style={{ fontSize: 12 }}>{formatCallTimePast(IncDate)}</Text>
                </View>
                <View key="callDetails" style={{ padding: 2 }}>
                    <View 
                        style={{
                            borderRadius: 12,
                            elevation: 3,
                            backgroundColor: '#fff',
                            shadowOffset: { width: 0, height: 0 },
                            shadowColor: callColorSelector(
                                IncNatureCode, 
                                IncNature,
                                Status
                            ),
                            shadowOpacity: 1,
                            shadowRadius: 5,
                            padding: 10,
                        }}
                    >
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <SelectedIcon 
                                    color={callColorSelector(
                                        IncNatureCode, 
                                        IncNature,
                                        Status
                                    )} 
                                    opacity={0.3} 
                                    width={56} 
                                    height={56}
                                />
                                <View style={{ flexDirection: 'column' }}>
                                    <Text 
                                        style={{ 
                                            color: 'black', 
                                            fontWeight: 600, 
                                            fontSize: 16 
                                        }}
                                    >
                                        {`${IncNature}`}
                                    </Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text 
                                            style={{ 
                                                color: 'black', 
                                                fontSize: 12, 
                                                textShadowColor: callColorSelector(
                                                    IncNatureCode, 
                                                    IncNature,
                                                    Status
                                                ), 
                                                textShadowRadius: 1 
                                            }}
                                        >
                                            {`${IncNatureCodeDesc}`}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                {Status === 'CLOSED' ? (
                                    <Text 
                                        style={{ 
                                            fontSize: 12, 
                                            fontWeight: 600,
                                            color: '#'
                                        }}
                                    >
                                        This Incident is Closed.
                                    </Text>
                                ) : <Text></Text> }
                                <Text
                                    style={{
                                        fontSize: 12,
                                        textAlign: 'right'
                                    }}
                                >
                                    {`Incident #: ${ServiceNumber}`}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ margin: 6 }}/>
                <View key="callLocation" style={{ padding: 2 }}>
                    <View
                        style={{
                            borderRadius: 12,
                            elevation: 3,
                            backgroundColor: '#fff',
                            shadowOffset: { width: 0, height: 0 },
                            shadowColor: 'grey',
                            shadowOpacity: 1,
                            shadowRadius: 1,
                            padding: 10,
                        }}
                    >
                        <View 
                            style={{ 
                                flexDirection: 'row', 
                                alignItems: 'top', 
                                justifyContent: 'space-between' 
                            }}
                        >
                            <View style={{ flexDirection: 'column' }}>
                                {LocationName ? (
                                    <Text 
                                        style={{ 
                                            color: 'black', 
                                            fontWeight: 600, 
                                            fontSize: 16 
                                        }}
                                    >
                                        {`${LocationName}`}
                                    </Text>
                                ) : null }
                                <TouchableOpacity
                                    onLongPress={() => {
                                        return openMaps(Latitude, Longitude);
                                    }}
                                >
                                    <Text 
                                        style={[{
                                            color: 'black',
                                        }, LocationName ? {} : {fontSize: 12, fontWeight: 600}]}
                                    >
                                        {`${StreetAddress}`}
                                    </Text>
                                    <Text 
                                        style={[{
                                            color: 'black',
                                        }, LocationName ? {} : {fontSize: 12, fontWeight: 600}]}
                                    >
                                        {`${Town}, ${State}`}
                                    </Text>
                                </TouchableOpacity>
                                {AddressApartment ? (
                                    <View>
                                        <View style={{ margin: 10 }} />
                                        <Text 
                                            style={[{
                                                color: 'black',
                                            }, LocationName ? {} : {fontSize: 12, fontWeight: 600}]}
                                        >
                                            {`${AddressApartment}`}
                                        </Text>
                                    </View>
                                ) : null}
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <View
                                    style={{
                                        borderRadius: 12,
                                        elevation: 3,
                                        backgroundColor: '#fff',
                                        shadowOffset: { width: 0, height: 0 },
                                        shadowColor: 'grey',
                                        shadowOpacity: 1,
                                        shadowRadius: 1,
                                        padding: 25,
                                    }}
                                >
                                    <Text style={{ fontSize: 12 }}>Map</Text>
                                </View>
                                <TouchableOpacity
                                    style={{
                                        borderRadius: 12,
                                        elevation: 3,
                                        backgroundColor: '#ECEDEE',
                                        shadowOffset: { width: 0, height: 0 },
                                        shadowColor: 'grey',
                                        shadowOpacity: 1,
                                        shadowRadius: 1,
                                        marginTop: 6,
                                        paddingLeft: 6,
                                        paddingVertical: 6,
                                        flexDirection: 'row',
                                        justifyContent: 'center'
                                    }}
                                    onPress={() => {
                                        return openMaps(Latitude, Longitude);
                                    }}
                                >
                                    <Text style={{ fontSize: 10 }}>Nav</Text>
                                    <Ionicons name="chevron-forward-outline" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ margin: 6 }}/>
                <View key="callCrossStreets"
                    style={{ 
                        padding: 2, 
                        flexDirection: 'row', 
                        justifyContent: 'space-evenly',
                        marginHorizontal: 2,
                    }} 
                >
                    <View 
                        style={{
                            borderRadius: 12,
                            elevation: 3,
                            backgroundColor: '#fff',
                            shadowOffset: { width: 0, height: 0 },
                            shadowColor: 'grey',
                            shadowOpacity: 1,
                            shadowRadius: 1,
                            paddingVertical: 14,
                            width: "48%"
                        }}
                    >
                        <Text 
                            style={{
                                fontSize: 12,
                                fontWeight: 600,
                                textAlign: 'center'
                            }}
                        >
                            {Intersection1}
                        </Text>
                    </View>
                    <View style={{ paddingHorizontal: "3%" }}/>
                    <View 
                        style={{
                            borderRadius: 12,
                            elevation: 3,
                            backgroundColor: '#fff',
                            shadowOffset: { width: 0, height: 0 },
                            shadowColor: 'grey',
                            shadowOpacity: 1,
                            shadowRadius: 1,
                            paddingVertical: 14,
                            width: "48%"
                        }}
                    >
                        <Text 
                            style={{
                                fontSize: 12,
                                fontWeight: 600,
                                textAlign: 'center'
                            }}
                        >
                            {Intersection2}
                        </Text>
                    </View>
                </View>
                <View style={{ margin: 6 }}/>
                <View key="callerInformation" style={{ padding: 2 }}>
                    <View
                        style={{
                            borderRadius: 12,
                            elevation: 3,
                            backgroundColor: '#fff',
                            shadowOffset: { width: 0, height: 0 },
                            shadowColor: 'grey',
                            shadowOpacity: 1,
                            shadowRadius: 1,
                            padding: 10,
                        }}
                    >
                        {selectedDepartment?.supervisor ? (
                            <View>
                                <View>
                                    <View 
                                        style={{ 
                                            flexDirection: 'row', 
                                            alignItems: 'center', 
                                            justifyContent: 'space-between',
                                            marginHorizontal: 10
                                        }}
                                    >
                                        <View style={{ flexDirection: 'column' }}>
                                            <Text 
                                                style={{ 
                                                    color: 'black', 
                                                    fontWeight: 600, 
                                                    fontSize: 16 
                                                }}
                                            >
                                                {`${Name}`}
                                            </Text>
                                            <TouchableOpacity
                                                onLongPress={() => {
                                                    return callNumber(CallBackNumber);
                                                }}
                                            >
                                                <Text 
                                                    style={{ color: 'black', fontSize: 12 }}
                                                >
                                                    {`${CallBackNumber}`}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity
                                            onLongPress={() => {
                                                return callNumber(CallBackNumber);
                                            }}
                                        >
                                            <Phone 
                                                color='blue'
                                                opacity={0.3} 
                                                width={32} 
                                                height={32} 
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View 
                                    style={{ 
                                        marginVertical: 5, 
                                        height: 1, 
                                        width: '100%', 
                                        backgroundColor: 'grey'
                                    }} 
                                />
                            </View>
                        ) : null }
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 14 }}>
                                    {`${Age} `}
                                </Text>
                                <Text style={{ fontSize: 14 }}>
                                    {`${Gender} - `}
                                </Text>
                                <Text style={{ fontSize: 14 }}>
                                    {`Concious: ${Conscious} | `}
                                </Text>
                                <Text style={{ fontSize: 14 }}>
                                    {`Breathing: ${Breathing}`}
                                </Text>
                            </View>
                            <Text style={{ fontSize: 12 }}>
                                {`${Statement}`}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <View 
                        style={{ 
                            marginVertical: 10,
                            height: 2, 
                            width: '95%', 
                            backgroundColor: 'grey'
                        }} 
                    />
                </View>
                <View key="respondingUnitInformation" style={{ padding: 2 }}>
                    <View
                        style={{
                            borderRadius: 12,
                            elevation: 3,
                            backgroundColor: '#fff',
                            shadowOffset: { width: 0, height: 0 },
                            shadowColor: 'grey',
                            shadowOpacity: 1,
                            shadowRadius: 1,
                            padding: 10,
                        }}
                    >
                        <View style={{ flexDirection: 'column' }}>
                            {Units?.length > 0 ? (
                                <View>
                                    {ownDepartmentResponse?.length > 0 ? (
                                        <View>
                                            <View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                                    <Text style={{ fontWeight: '600', textAlign: 'center', flex: 1 }}>Units</Text>
                                                    <Text style={{ textAlign: 'center', flex: 1 }}>Disp</Text>
                                                    <Text style={{ textAlign: 'center', flex: 1 }}>Resp</Text>
                                                    <Text style={{ textAlign: 'center', flex: 1 }}>Arr</Text>
                                                    {selectedDepartment?.type === 'EMS' || selectedDepartment?.type === 'Rescue' ? (
                                                        <Text style={{ textAlign: 'center', flex: 1 }}>Trans</Text>
                                                    ) : null}
                                                    <Text style={{ textAlign: 'center', flex: 1 }}>BIS</Text>
                                                </View>
                                                <View 
                                                    style={{ 
                                                        marginVertical: 5, 
                                                        height: 1, 
                                                        width: '95%', 
                                                        backgroundColor: 'grey',
                                                        alignSelf: 'center'
                                                    }} 
                                                />
                                                <View
                                                    style={{ 
                                                        flex: 1,
                                                        alignItems: 'center', 
                                                        justifyContent: 'center' 
                                                    }}
                                                >
                                                    {ownDepartmentResponse?.map((unit) => {
                                                        return (
                                                            <View key={unit?.Unit}
                                                                style={{ 
                                                                    flex: 1, 
                                                                    alignSelf: 'stretch', 
                                                                    flexDirection: 'row',
                                                                    justifyContent: 'space-evenly',
                                                                    alignItems: 'center'
                                                                }}
                                                            >
                                                                <Text 
                                                                    style={{ 
                                                                        fontWeight: 600,
                                                                        textAlign: 'center',
                                                                        flex: 1
                                                                    }}
                                                                >
                                                                    {unit?.Unit}
                                                                </Text>
                                                                <Text style={{ textAlign: 'center', flex: 1 }}>
                                                                    {formatResponseTimes(unit?.Dispatched)}
                                                                </Text>
                                                                <Text style={{ textAlign: 'center', flex: 1 }}>
                                                                    {formatResponseTimes(unit?.Responding)}
                                                                </Text>
                                                                <Text style={{ textAlign: 'center', flex: 1 }}>
                                                                    {formatResponseTimes(unit?.OnScene)}
                                                                </Text>
                                                                {selectedDepartment?.type === 'EMS' || 
                                                                selectedDepartment?.type === 'Rescue' ? (
                                                                    <Text style={{ textAlign: 'center', flex: 1 }}>
                                                                        {formatResponseTimes(unit?.Transporting)}
                                                                    </Text>
                                                                ) : null }
                                                                <Text style={{ textAlign: 'center', flex: 1 }}>
                                                                    {formatResponseTimes(unit?.InService)}
                                                                </Text>
                                                            </View>
                                                        )
                                                    })}
                                                </View>
                                            </View>
                                        </View>
                                    ) : (
                                        <View style={{ alignItems: 'center' }}>
                                            <Text 
                                                style={{ 
                                                    textAlign: 'center' 
                                                }}
                                            >
                                                {`No ${selectedDepartment?.dept} Units Responding`}
                                            </Text>
                                        </View>
                                    ) }
                                    {mutualAidDepartmentResponse?.length > 0 ? (
                                        <View>
                                            <View 
                                                style={{ 
                                                    marginVertical: 5, 
                                                    height: 2, 
                                                    width: '100%', 
                                                    backgroundColor: 'grey',
                                                }} 
                                            />
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                                <Text style={{ fontWeight: '600', textAlign: 'center', flex: 1 }}>M/A</Text>
                                                <Text style={{ textAlign: 'center', flex: 1 }}>Disp</Text>
                                                <Text style={{ textAlign: 'center', flex: 1 }}>Resp</Text>
                                                <Text style={{ textAlign: 'center', flex: 1 }}>Arr</Text>
                                                {selectedDepartment?.type === 'EMS' || selectedDepartment?.type === 'Rescue' ? (
                                                    <Text style={{ textAlign: 'center', flex: 1 }}>Trans</Text>
                                                ) : null}
                                                <Text style={{ textAlign: 'center', flex: 1 }}>BIS</Text>
                                            </View>
                                            <View 
                                                style={{ 
                                                    marginVertical: 5, 
                                                    height: 1, 
                                                    width: '95%', 
                                                    backgroundColor: 'grey',
                                                    alignSelf: 'center'
                                                }} 
                                            />
                                            {mutualAidDepartmentResponse?.map((unit) => {
                                                return (
                                                    <View key={unit?.Unit}
                                                        style={{ 
                                                            flex: 1, 
                                                            alignSelf: 'stretch', 
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-evenly',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <Text 
                                                            style={{ 
                                                                fontWeight: 600,
                                                                textAlign: 'center',
                                                                flex: 1
                                                            }}
                                                        >
                                                            {unit?.Unit}
                                                        </Text>
                                                        <Text style={{ textAlign: 'center', flex: 1 }}>
                                                            {formatResponseTimes(unit?.Dispatched)}
                                                        </Text>
                                                        <Text style={{ textAlign: 'center', flex: 1 }}>
                                                            {formatResponseTimes(unit?.Responding)}
                                                        </Text>
                                                        <Text style={{ textAlign: 'center', flex: 1 }}>
                                                            {formatResponseTimes(unit?.OnScene)}
                                                        </Text>
                                                        {selectedDepartment?.type === 'EMS' || 
                                                        selectedDepartment?.type === 'Rescue' ? (
                                                            <Text style={{ textAlign: 'center', flex: 1 }}>
                                                                {formatResponseTimes(unit?.Transporting)}
                                                            </Text>
                                                        ) : null }
                                                        <Text style={{ textAlign: 'center', flex: 1 }}>
                                                            {formatResponseTimes(unit?.InService)}
                                                        </Text>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    ) : null }
                                </View>
                            ) : (
                                <View style={{ alignItems: 'center' }}>
                                    <Text>No Units Responding</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
                <View style={{ margin: 6 }}/>
                <Text 
                    style={{
                        color: 'grey',
                        fontWeight: 600,
                        paddingLeft: 10
                    }}
                >
                    Incident Notes
                </Text>
                <View style={{ margin: 2 }}/>
                <View key="incidentNotes" style={{ padding: 2 }}>
                    <View
                        style={{
                            borderRadius: 12,
                            elevation: 3,
                            backgroundColor: '#fff',
                            shadowOffset: { width: 0, height: 0 },
                            shadowColor: 'grey',
                            shadowOpacity: 1,
                            shadowRadius: 1,
                            padding: 10,
                            minHeight: 200
                        }}
                    >
                        {Notes?.split('\n').map((note, index) => (
                            <View key={index}>
                                <Text>{note}</Text>
                                {index < Notes.split('\n').length - 1 && (
                                    <View 
                                        style={{ 
                                            height: 1, 
                                            backgroundColor: 'grey', 
                                            marginVertical: 10
                                        }} 
                                    />
                                )}
                            </View>
                        ))}
                    </View>
                </View>
            </View>
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
    );
  }