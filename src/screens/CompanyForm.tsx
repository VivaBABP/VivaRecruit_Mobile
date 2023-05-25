import {Text, View, StyleSheet, ScrollView, Switch} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Button, TextInput } from "react-native-paper";
import React, {useEffect, useState} from "react";
import Constants from "expo-constants";
import {CreateCompanyDto, UpdateCompanyDto} from "../client/recruitBack";
import {PaperSelect} from "react-native-paper-select";
import {CompanyService} from "../services/CompanyService";
import {ListItem} from "react-native-paper-select/lib/typescript/interface/paperSelect.interface";
import {CompanyTypeService} from "../services/CompanyTypeService";

// Ce formulaire est le formulaire de mise à jour de donnée de contact seulement pour les candidats. 
// La ligne sera créée lors de la création du compte avec le mail uniquement.

export default function CompanyForm() {
    const companies: ListItem[] = [];
    const typeCompanies: ListItem[] = [];
    const companySelected = '';
    const [idCompany, setIdCompany] = useState(0);
    const [typeCompanySelected, setTypeCompanySelected] = useState<any>('');
    const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm<UpdateCompanyDto>();
    const companyService = new CompanyService;
    const companyTypeService = new CompanyTypeService;
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    useEffect(() => {
        getTypeCompanies();
        getCompanies();
    })

    const getCompanies = () => {
        companies.pop();
        companyService.findAll().then((res) =>{
            res.forEach((e) =>{
                companies.push({_id: e.idCompany.toString(), value: e.companyName});
            });
        }).catch((err) => {
            console.log(JSON.stringify(err));
            alert("Aucune entreprise existante");
        });
    }

    const getTypeCompanies = () => {
        companyTypeService.getCompanyTypes().then((res) =>{
            typeCompanies.pop();
            res.forEach((e) => {
                typeCompanies.push({_id: e.idCompanyType.toString(), value: e.companyTypeLabel})
            })
        })
    };

    const setForm = (id: any) => {
        setIdCompany(id.selectedList.at(0)._id);
        companyService.findOne(id.selectedList.at(0)._id).then((res) => {
            setValue('companyName', res.companyName);
            setValue('companyType', res.idTypeCompany.toString());
            setValue('description', res.description);
            setValue('websiteLink', res.websiteLink);
            setValue('lineOfBusiness', res.lineOfBusiness);
        }).catch((err) => {
            console.log(err);
        });
    }
    const changeTypeCompany = (id: any) => {
        setTypeCompanySelected(id.selectedList.at(0)._id as string);
    }
    const save = (data: UpdateCompanyDto) => {
        if (!isSwitchOn){
            companyService.setCompany(idCompany, {companyTypeId: data.companyTypeId, companyName: data.companyName, websiteLink: data.websiteLink, lineOfBusiness: data.lineOfBusiness, description: data.description} as UpdateCompanyDto)
                .then(() => {alert("Entreprise bien modifiée")}).catch((err) => alert(JSON.stringify(err)));
        } else {
            console.log(typeCompanySelected);
            const company = {
                companyName: data.companyName as string,
                companyTypeId: +typeCompanySelected,
                description: data.description as string,
                lineOfBusiness: data.lineOfBusiness as string,
                websiteLink: data.websiteLink as string,
            } as CreateCompanyDto;
            companyService.createCompany(company).then((res) => {
                alert("Entreprise créée");
            }).catch((err) => {
                if (err.status == 201) {
                    alert("Entreprise créée");
                    console.log(JSON.stringify(err))
                }
                ;
            })
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: Constants.statusBarHeight,
            padding: 8,
            backgroundColor: 'White',
        },
        label: {
            color: '#000000',
            margin: 20,
            marginLeft: 0,
        },
        button: {
            marginTop: 20,
            marginBottom: 70,
            color: 'white',
            height: 40,
            backgroundColor: 'White',
            borderRadius: 4,
        },
        input: {
            backgroundColor: 'white',
            borderColor: '#000000',
            borderBottomWidth: 2,
            height: 40,
            padding: 10,
            borderRadius: 4,
        },
    })

    return (
        <ScrollView style={styles.container}>
            <Text>Créer une entreprise :</Text>
            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            {!isSwitchOn && <PaperSelect label="Entreprise" arrayList={companies} selectedArrayList={companies} multiEnable={false} value={companySelected} onSelection={(id: any) => setForm(id)}/>}
            <Text style={styles.label}>Nom de l'entreprise</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                    />
                )}
                name="companyName"
                rules={{required: true}}
            />
            {errors.CompanyName && <Text>Nom requis</Text>}
            <Text style={styles.label}>Description</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                    />
                )}
                name="description"
            />
            <Text style={styles.label}>Lien vers le site</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                    />
                )}
                name="websiteLink"
            />
            <Text style={styles.label}>Secteur d'activité</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={styles.input}
                        onBlur={onBlur}
                        onChangeText={value => onChange(value)}
                        value={value}
                    />
                )}
                name="lineOfBusiness"
            />
            <Text style={styles.label}>Type d'entreprise</Text>
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <PaperSelect label="Type" arrayList={typeCompanies} selectedArrayList={typeCompanies} multiEnable={false} value={typeCompanySelected} onSelection={(id: any) => onChange(changeTypeCompany(id))}/>
            )}
                name="companyType"
            />
            <View style={styles.button}>
                <Button
                    onPress={() => {
                        reset({
                            CompanyName: '',
                            Description: '',
                            WebsiteLink: '',
                            LineOfBusiness: '',
                            CompanyType: ''
                        })
                    }}
                >Reset</Button>

                <Button
                    onPress={handleSubmit(save)}
                >Valider</Button>
            </View>
        </ScrollView>
    )
}