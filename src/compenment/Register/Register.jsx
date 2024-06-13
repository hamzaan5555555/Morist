import Loin from '../../assets/Logo1.png';
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {axiosClient} from "../../api/axios.js";
import {useNavigate} from "react-router-dom";
import { useState } from 'react';
import {USER_DASHBOARD_ROUTE} from "../../router/index.jsx";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { ButtonLoading } from './ButtonLoading';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function Register() {
	const [loading, setLoading] = useState(false); 

	

	
	
  const [error, setError] = useState(null);




  const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
    setLoading(true); 
		
	try {
        await axiosClient.get('/sanctum/csrf-cookie', {
            baseURL: import.meta.env.VITE_BACKEND_URL
        });
		

        
        const formData = new FormData(e.target);
        const values = {};
        formData.forEach((value, key) => {
            values[key] = value;
        });

        const response = await axiosClient.post('/register', values);
        if (response.status === 201) {
            window.localStorage.setItem('ACCESS_TOKEN', response.data.uid);
            window.localStorage.setItem('TYPE_COMPTE', response.data.customClaims.type_compte);
			if(response.data.customClaims.type_compte == "Tourist"){
				navigate("/touristDashboard");
			} else {
				navigate("/guideDashboard");
			}
        }
    } catch (error) {
        if (error.response) {
			setError(error.response.data.errors);
            
        }
    }
    setLoading(false); 
	
    };


    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"></h2>
                <img className="mx-auto h-10 w-auto mt-10 no-pointer" src={Loin} alt="Morist" />
            </div>

            <div className="sm:mx-auto sm:w-full">
				<form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
          {error && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          )}
				<div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 mt-10">

					<div>
						<label htmlFor="prenom" className="block text-sm font-semibold leading-6 text-gray-900">
							Prénom <span className='text-red-600'>*</span>
						</label>
						<div className="mt-2.5">
							<Input id="prenom" name="prenom" required/>
						</div>
					</div>
					<div>
						<label htmlFor="nom" className="block text-sm font-semibold leading-6 text-gray-900">
							Nom <span className='text-red-600'>*</span>
						</label>
						<div className="mt-2.5">
							<Input id="nom" name="nom" required/>
						</div>
					</div>
					<div>
						<label className="block text-sm font-semibold leading-6 text-gray-900">
							Type de Compte <span className='text-red-600'>*</span>
						</label>
						<div className="mt-2.5">
							<RadioGroup id="type_compte" name="type_compte" defaultValue="Tourist" required>

								<div className="flex items-center space-x-2">
									<RadioGroupItem value="Guide" id="r2" className="text-amber-700"/>
									<Label htmlFor="r2">Guide</Label>
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="Tourist" id="r3" className="text-amber-700"/>
									<Label htmlFor="r3">Touriste</Label>
								</div>
							</RadioGroup>
						</div>
					</div>


					<div className="sm:col-span-2">
						<label htmlFor="languages" className="block text-sm font-semibold leading-6 text-gray-900">
							Language <span className='text-red-600'>*</span>
						</label>
						<div className="mt-2.5">
							<Select name="languages" required>
								<SelectTrigger id="languages" className="w-[280px]">
									<SelectValue placeholder="Choisie Votre Languages" />
								</SelectTrigger>
								<SelectContent>
										<SelectItem value="English">English</SelectItem>
										<SelectItem value="Franch">Franch</SelectItem>
										<SelectItem value="Arabic">Arabic</SelectItem>
										<SelectItem value="Espagnol">Espagnol</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>


					<div className="sm:col-span-2">
						<label htmlFor="nationalite" className="block text-sm font-semibold leading-6 text-gray-900">
							Nationalité
						</label>
						<div className="mt-2.5">
							<Select name="nationalite" required>
								<SelectTrigger id="nationalite" className="w-[280px]">
									<SelectValue placeholder="Choisie Votre Pays" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Afghanistan">Afghanistan</SelectItem>
									<SelectItem value="Albania">Albania</SelectItem>
									<SelectItem value="Algeria">Algeria</SelectItem>
									<SelectItem value="Andorra">Andorra</SelectItem>
									<SelectItem value="Angola">Angola</SelectItem>
									<SelectItem value="Antigua and Barbuda">Antigua and Barbuda</SelectItem>
									<SelectItem value="Argentina">Argentina</SelectItem>
									<SelectItem value="Armenia">Armenia</SelectItem>
									<SelectItem value="Australia">Australia</SelectItem>
									<SelectItem value="Austria">Austria</SelectItem>
									<SelectItem value="Azerbaijan">Azerbaijan</SelectItem>
									<SelectItem value="The Bahamas">The Bahamas</SelectItem>
									<SelectItem value="Bahrain">Bahrain</SelectItem>
									<SelectItem value="Bangladesh">Bangladesh</SelectItem>
									<SelectItem value="Barbados">Barbados</SelectItem>
									<SelectItem value="Belarus">Belarus</SelectItem>
									<SelectItem value="Belgium">Belgium</SelectItem>
									<SelectItem value="Belize">Belize</SelectItem>
									<SelectItem value="Benin">Benin</SelectItem>
									<SelectItem value="Bhutan">Bhutan</SelectItem>
									<SelectItem value="Bolivia">Bolivia</SelectItem>
									<SelectItem value="Bosnia and Herzegovina">Bosnia and Herzegovina</SelectItem>
									<SelectItem value="Botswana">Botswana</SelectItem>
									<SelectItem value="Brazil">Brazil</SelectItem>
									<SelectItem value="Brunei">Brunei</SelectItem>
									<SelectItem value="Bulgaria">Bulgaria</SelectItem>
									<SelectItem value="Burkina Faso">Burkina Faso</SelectItem>
									<SelectItem value="Burundi">Burundi</SelectItem>
									<SelectItem value="Cabo Verde">Cabo Verde</SelectItem>
									<SelectItem value="Cambodia">Cambodia</SelectItem>
									<SelectItem value="Cameroon">Cameroon</SelectItem>
									<SelectItem value="Canada">Canada</SelectItem>
									<SelectItem value="Central African Republic">Central African Republic</SelectItem>
									<SelectItem value="Chad">Chad</SelectItem>
									<SelectItem value="Chile">Chile</SelectItem>
									<SelectItem value="China">China</SelectItem>
									<SelectItem value="Colombia">Colombia</SelectItem>
									<SelectItem value="Comoros">Comoros</SelectItem>
									<SelectItem value="Congo, Democratic Republic of the">Congo, Democratic Republic of the</SelectItem>
									<SelectItem value="Congo, Republic of the">Congo, Republic of the</SelectItem>
									<SelectItem value="Costa Rica">Costa Rica</SelectItem>
									<SelectItem value="Côte d’Ivoire">Côte d’Ivoire</SelectItem>
									<SelectItem value="Croatia">Croatia</SelectItem>
									<SelectItem value="Cuba">Cuba</SelectItem>
									<SelectItem value="Cyprus">Cyprus</SelectItem>
									<SelectItem value="Czech Republic">Czech Republic</SelectItem>
									<SelectItem value="Denmark">Denmark</SelectItem>
									<SelectItem value="Djibouti">Djibouti</SelectItem>
									<SelectItem value="Dominica">Dominica</SelectItem>
									<SelectItem value="Dominican Republic">Dominican Republic</SelectItem>
									<SelectItem value="East Timor (Timor-Leste)">East Timor (Timor-Leste)</SelectItem>
									<SelectItem value="Ecuador">Ecuador</SelectItem>
									<SelectItem value="Egypt">Egypt</SelectItem>
									<SelectItem value="El Salvador">El Salvador</SelectItem>
									<SelectItem value="Equatorial Guinea">Equatorial Guinea</SelectItem>
									<SelectItem value="Eritrea">Eritrea</SelectItem>
									<SelectItem value="Estonia">Estonia</SelectItem>
									<SelectItem value="Eswatini">Eswatini</SelectItem>
									<SelectItem value="Ethiopia">Ethiopia</SelectItem>
									<SelectItem value="Fiji">Fiji</SelectItem>
									<SelectItem value="Finland">Finland</SelectItem>
									<SelectItem value="France">France</SelectItem>
									<SelectItem value="Gabon">Gabon</SelectItem>
									<SelectItem value="The Gambia">The Gambia</SelectItem>
									<SelectItem value="Georgia">Georgia</SelectItem>
									<SelectItem value="Germany">Germany</SelectItem>
									<SelectItem value="Ghana">Ghana</SelectItem>
									<SelectItem value="Greece">Greece</SelectItem>
									<SelectItem value="Grenada">Grenada</SelectItem>
									<SelectItem value="Guatemala">Guatemala</SelectItem>
									<SelectItem value="Guinea">Guinea</SelectItem>
									<SelectItem value="Guinea-Bissau">Guinea-Bissau</SelectItem>
									<SelectItem value="Guyana">Guyana</SelectItem>
									<SelectItem value="Haiti">Haiti</SelectItem>
									<SelectItem value="Honduras">Honduras</SelectItem>
									<SelectItem value="Hungary">Hungary</SelectItem>
									<SelectItem value="Iceland">Iceland</SelectItem>
									<SelectItem value="India">India</SelectItem>
									<SelectItem value="Indonesia">Indonesia</SelectItem>
									<SelectItem value="Iran">Iran</SelectItem>
									<SelectItem value="Iraq">Iraq</SelectItem>
									<SelectItem value="Ireland">Ireland</SelectItem>
									<SelectItem value="Israel">Israel</SelectItem>
									<SelectItem value="Italy">Italy</SelectItem>
									<SelectItem value="Jamaica">Jamaica</SelectItem>
									<SelectItem value="Japan">Japan</SelectItem>
									<SelectItem value="Jordan">Jordan</SelectItem>
									<SelectItem value="Kazakhstan">Kazakhstan</SelectItem>
									<SelectItem value="Kenya">Kenya</SelectItem>
									<SelectItem value="Kiribati">Kiribati</SelectItem>
									<SelectItem value="Korea, North">Korea, North</SelectItem>
									<SelectItem value="Korea, South">Korea, South</SelectItem>
									<SelectItem value="Kosovo">Kosovo</SelectItem>
									<SelectItem value="Kuwait">Kuwait</SelectItem>
									<SelectItem value="Kyrgyzstan">Kyrgyzstan</SelectItem>
									<SelectItem value="L">L</SelectItem>
									<SelectItem value="Laos">Laos</SelectItem>
									<SelectItem value="Latvia">Latvia</SelectItem>
									<SelectItem value="Lebanon">Lebanon</SelectItem>
									<SelectItem value="Lesotho">Lesotho</SelectItem>
									<SelectItem value="Liberia">Liberia</SelectItem>
									<SelectItem value="Libya">Libya</SelectItem>
									<SelectItem value="Liechtenstein">Liechtenstein</SelectItem>
									<SelectItem value="Lithuania">Lithuania</SelectItem>
									<SelectItem value="Luxembourg">Luxembourg</SelectItem>
									<SelectItem value="Madagascar">Madagascar</SelectItem>
									<SelectItem value="Malawi">Malawi</SelectItem>
									<SelectItem value="Malaysia">Malaysia</SelectItem>
									<SelectItem value="Maldives">Maldives</SelectItem>
									<SelectItem value="Mali">Mali</SelectItem>
									<SelectItem value="Malta">Malta</SelectItem>
									<SelectItem value="Marshall Islands">Marshall Islands</SelectItem>
									<SelectItem value="Mauritania">Mauritania</SelectItem>
									<SelectItem value="Mauritius">Mauritius</SelectItem>
									<SelectItem value="Mexico">Mexico</SelectItem>
									<SelectItem value="Micronesia, Federated States of">Micronesia, Federated States of</SelectItem>
									<SelectItem value="Moldova">Moldova</SelectItem>
									<SelectItem value="Monaco">Monaco</SelectItem>
									<SelectItem value="Mongolia">Mongolia</SelectItem>
									<SelectItem value="Montenegro">Montenegro</SelectItem>
									<SelectItem value="Morocco">Morocco</SelectItem>
									<SelectItem value="Mozambique">Mozambique</SelectItem>
									<SelectItem value="Myanmar (Burma)">Myanmar (Burma)</SelectItem>
									<SelectItem value="Namibia">Namibia</SelectItem>
									<SelectItem value="Nauru">Nauru</SelectItem>
									<SelectItem value="Nepal">Nepal</SelectItem>
									<SelectItem value="Netherlands">Netherlands</SelectItem>
									<SelectItem value="New Zealand">New Zealand</SelectItem>
									<SelectItem value="Nicaragua">Nicaragua</SelectItem>
									<SelectItem value="Niger">Niger</SelectItem>
									<SelectItem value="Nigeria">Nigeria</SelectItem>
									<SelectItem value="North Macedonia">North Macedonia</SelectItem>
									<SelectItem value="Norway">Norway</SelectItem>
									<SelectItem value="Oman">Oman</SelectItem>
									<SelectItem value="Pakistan">Pakistan</SelectItem>
									<SelectItem value="Palau">Palau</SelectItem>
									<SelectItem value="Panama">Panama</SelectItem>
									<SelectItem value="Papua New Guinea">Papua New Guinea</SelectItem>
									<SelectItem value="Paraguay">Paraguay</SelectItem>
									<SelectItem value="Peru">Peru</SelectItem>
									<SelectItem value="Philippines">Philippines</SelectItem>
									<SelectItem value="Poland">Poland</SelectItem>
									<SelectItem value="Portugal">Portugal</SelectItem>
									<SelectItem value="Qatar">Qatar</SelectItem>
									<SelectItem value="Romania">Romania</SelectItem>
									<SelectItem value="Russia">Russia</SelectItem>
									<SelectItem value="Rwanda">Rwanda</SelectItem>
									<SelectItem value="Saint Kitts and Nevis">Saint Kitts and Nevis</SelectItem>
									<SelectItem value="Saint Lucia">Saint Lucia</SelectItem>
									<SelectItem value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</SelectItem>
									<SelectItem value="Samoa">Samoa</SelectItem>
									<SelectItem value="San Marino">San Marino</SelectItem>
									<SelectItem value="Sao Tome and Principe">Sao Tome and Principe</SelectItem>
									<SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
									<SelectItem value="Senegal">Senegal</SelectItem>
									<SelectItem value="Serbia">Serbia</SelectItem>
									<SelectItem value="Seychelles">Seychelles</SelectItem>
									<SelectItem value="Sierra Leone">Sierra Leone</SelectItem>
									<SelectItem value="Singapore">Singapore</SelectItem>
									<SelectItem value="Slovakia">Slovakia</SelectItem>
									<SelectItem value="Slovenia">Slovenia</SelectItem>
									<SelectItem value="Solomon Islands">Solomon Islands</SelectItem>
									<SelectItem value="Somalia">Somalia</SelectItem>
									<SelectItem value="South Africa">South Africa</SelectItem>
									<SelectItem value="Spain">Spain</SelectItem>
									<SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
									<SelectItem value="Sudan">Sudan</SelectItem>
									<SelectItem value="Sudan, South">Sudan, South</SelectItem>
									<SelectItem value="Suriname">Suriname</SelectItem>
									<SelectItem value="Sweden">Sweden</SelectItem>
									<SelectItem value="Switzerland">Switzerland</SelectItem>
									<SelectItem value="Syria">Syria</SelectItem>
									<SelectItem value="Taiwan">Taiwan</SelectItem>
									<SelectItem value="Tajikistan">Tajikistan</SelectItem>
									<SelectItem value="Tanzania">Tanzania</SelectItem>
									<SelectItem value="Thailand">Thailand</SelectItem>
									<SelectItem value="Togo">Togo</SelectItem>
									<SelectItem value="Tonga">Tonga</SelectItem>
									<SelectItem value="Trinidad and Tobago">Trinidad and Tobago</SelectItem>
									<SelectItem value="Tunisia">Tunisia</SelectItem>
									<SelectItem value="Turkey">Turkey</SelectItem>
									<SelectItem value="Turkmenistan">Turkmenistan</SelectItem>
									<SelectItem value="Tuvalu">Tuvalu</SelectItem>
									<SelectItem value="Uganda">Uganda</SelectItem>
									<SelectItem value="Ukraine">Ukraine</SelectItem>
									<SelectItem value="United Arab Emirates">United Arab Emirates</SelectItem>
									<SelectItem value="United Kingdom">United Kingdom</SelectItem>
									<SelectItem value="United States">United States</SelectItem>
									<SelectItem value="Uruguay">Uruguay</SelectItem>
									<SelectItem value="Uzbekistan">Uzbekistan</SelectItem>
									<SelectItem value="Vanuatu">Vanuatu</SelectItem>
									<SelectItem value="Vatican City">Vatican City</SelectItem>
									<SelectItem value="Venezuela">Venezuela</SelectItem>
									<SelectItem value="Vietnam">Vietnam</SelectItem>
									<SelectItem value="Yemen">Yemen</SelectItem>
									<SelectItem value="Zambia">Zambia</SelectItem>
									<SelectItem value="Zimbabwe">Zimbabwe</SelectItem>
									
									
								</SelectContent>
							</Select>
						</div>
					</div>
					
					
					<div className="sm:col-span-2">
						<label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
							E-mail <span className='text-red-600'>*</span>
						</label>
						<div className="mt-2.5">
							<Input id="email" name="email" required/>
						</div>
					</div>
					<div className="sm:col-span-2">
						<label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">
							Mot de passe <span className='text-red-600'>*</span>
						</label>
						<div className="mt-2.5">
							<Input id="password" name="password" type="password" required />
						</div>
					</div>
					<div className="sm:col-span-2">
						<label htmlFor="password_confirmation" className="block text-sm font-semibold leading-6 text-gray-900">
							Confirmation de Mot de passe <span className='text-red-600'>*</span>
						</label>
						<div className="mt-2.5">
							<Input id="password_confirmation" name="password_confirmation" type="password" required />
						</div>
					</div>



				</div>
				<div className="mt-10">
					{loading ? (
              <ButtonLoading />
            ) : (
              <button
						type="submit"
						className="block w-full rounded-md bg-amber-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Registre
					</button>
            )}
				</div>
			</form>
        </div>
        </div>
    );
}

export default Register;





 


// <SelectItem value="Andorra">Andorra</SelectItem>
// 									<SelectItem value="Angola">Angola</SelectItem>
// 									<SelectItem value="Antigua and Barbuda">Antigua and Barbuda</SelectItem>
// 									<SelectItem value="Argentina">Argentina</SelectItem>
// 									<SelectItem value="Armenia">Armenia</SelectItem>
// 									<SelectItem value="Australia">Australia</SelectItem>
// 									<SelectItem value="Austria">Austria</SelectItem>
// 									<SelectItem value="Azerbaijan">Azerbaijan</SelectItem>
// 									<SelectItem value="The Bahamas">The Bahamas</SelectItem>
// 									<SelectItem value="Bahrain">Bahrain</SelectItem>
// 									<SelectItem value="Bangladesh">Bangladesh</SelectItem>
// 									<SelectItem value="Barbados">Barbados</SelectItem>
// 									<SelectItem value="Belarus">Belarus</SelectItem>
// 									<SelectItem value="Belgium">Belgium</SelectItem>
// 									<SelectItem value="Belize">Belize</SelectItem>
// 									<SelectItem value="Benin">Benin</SelectItem>
// 									<SelectItem value="Bhutan">Bhutan</SelectItem>
// 									<SelectItem value="Bolivia">Bolivia</SelectItem>
// 									<SelectItem value="Bosnia and Herzegovina">Bosnia and Herzegovina</SelectItem>
// 									<SelectItem value="Botswana">Botswana</SelectItem>
// 									<SelectItem value="Brazil">Brazil</SelectItem>
// 									<SelectItem value="Brunei">Brunei</SelectItem>
// 									<SelectItem value="Bulgaria">Bulgaria</SelectItem>
// 									<SelectItem value="Burkina Faso">Burkina Faso</SelectItem>
// 									<SelectItem value="Burundi">Burundi</SelectItem>
// 									<SelectItem value="Cabo Verde">Cabo Verde</SelectItem>
// 									<SelectItem value="Cambodia">Cambodia</SelectItem>
// 									<SelectItem value="Cameroon">Cameroon</SelectItem>
// 									<SelectItem value="Canada">Canada</SelectItem>
// 									<SelectItem value="Central African Republic">Central African Republic</SelectItem>
// 									<SelectItem value="Chad">Chad</SelectItem>
// 									<SelectItem value="Chile">Chile</SelectItem>
// 									<SelectItem value="China">China</SelectItem>
// 									<SelectItem value="Colombia">Colombia</SelectItem>
// 									<SelectItem value="Comoros">Comoros</SelectItem>
// 									<SelectItem value="Congo, Democratic Republic of the">Congo, Democratic Republic of the</SelectItem>
// 									<SelectItem value="Congo, Republic of the">Congo, Republic of the</SelectItem>
// 									<SelectItem value="Costa Rica">Costa Rica</SelectItem>
// 									<SelectItem value="Côte d’Ivoire">Côte d’Ivoire</SelectItem>
// 									<SelectItem value="Croatia">Croatia</SelectItem>
// 									<SelectItem value="Cuba">Cuba</SelectItem>
// 									<SelectItem value="Cyprus">Cyprus</SelectItem>
// 									<SelectItem value="Czech Republic">Czech Republic</SelectItem>
// 									<SelectItem value="Denmark">Denmark</SelectItem>
// 									<SelectItem value="Djibouti">Djibouti</SelectItem>
// 									<SelectItem value="Dominica">Dominica</SelectItem>
// 									<SelectItem value="Dominican Republic">Dominican Republic</SelectItem>
// 									<SelectItem value="East Timor (Timor-Leste)">East Timor (Timor-Leste)</SelectItem>
// 									<SelectItem value="Ecuador">Ecuador</SelectItem>
// 									<SelectItem value="Egypt">Egypt</SelectItem>
// 									<SelectItem value="El Salvador">El Salvador</SelectItem>
// 									<SelectItem value="Equatorial Guinea">Equatorial Guinea</SelectItem>
// 									<SelectItem value="Eritrea">Eritrea</SelectItem>
// 									<SelectItem value="Estonia">Estonia</SelectItem>
// 									<SelectItem value="Eswatini">Eswatini</SelectItem>
// 									<SelectItem value="Ethiopia">Ethiopia</SelectItem>
// 									<SelectItem value="Fiji">Fiji</SelectItem>
// 									<SelectItem value="Finland">Finland</SelectItem>
// 									<SelectItem value="France">France</SelectItem>
// 									<SelectItem value="Gabon">Gabon</SelectItem>
// 									<SelectItem value="The Gambia">The Gambia</SelectItem>
// 									<SelectItem value="Georgia">Georgia</SelectItem>
// 									<SelectItem value="Germany">Germany</SelectItem>
// 									<SelectItem value="Ghana">Ghana</SelectItem>
// 									<SelectItem value="Greece">Greece</SelectItem>
// 									<SelectItem value="Grenada">Grenada</SelectItem>
// 									<SelectItem value="Guatemala">Guatemala</SelectItem>
// 									<SelectItem value="Guinea">Guinea</SelectItem>
// 									<SelectItem value="Guinea-Bissau">Guinea-Bissau</SelectItem>
// 									<SelectItem value="Guyana">Guyana</SelectItem>
// 									<SelectItem value="Haiti">Haiti</SelectItem>
// 									<SelectItem value="Honduras">Honduras</SelectItem>
// 									<SelectItem value="Hungary">Hungary</SelectItem>
// 									<SelectItem value="Iceland">Iceland</SelectItem>
// 									<SelectItem value="India">India</SelectItem>
// 									<SelectItem value="Indonesia">Indonesia</SelectItem>
// 									<SelectItem value="Iran">Iran</SelectItem>
// 									<SelectItem value="Iraq">Iraq</SelectItem>
// 									<SelectItem value="Ireland">Ireland</SelectItem>
// 									<SelectItem value="Israel">Israel</SelectItem>
// 									<SelectItem value="Italy">Italy</SelectItem>
// 									<SelectItem value="Jamaica">Jamaica</SelectItem>
// 									<SelectItem value="Japan">Japan</SelectItem>
// 									<SelectItem value="Jordan">Jordan</SelectItem>
// 									<SelectItem value="Kazakhstan">Kazakhstan</SelectItem>
// 									<SelectItem value="Kenya">Kenya</SelectItem>
// 									<SelectItem value="Kiribati">Kiribati</SelectItem>
// 									<SelectItem value="Korea, North">Korea, North</SelectItem>
// 									<SelectItem value="Korea, South">Korea, South</SelectItem>
// 									<SelectItem value="Kosovo">Kosovo</SelectItem>
// 									<SelectItem value="Kuwait">Kuwait</SelectItem>
// 									<SelectItem value="Kyrgyzstan">Kyrgyzstan</SelectItem>
// 									<SelectItem value="L">L</SelectItem>
// 									<SelectItem value="Laos">Laos</SelectItem>
// 									<SelectItem value="Latvia">Latvia</SelectItem>
// 									<SelectItem value="Lebanon">Lebanon</SelectItem>
// 									<SelectItem value="Lesotho">Lesotho</SelectItem>
// 									<SelectItem value="Liberia">Liberia</SelectItem>
// 									<SelectItem value="Libya">Libya</SelectItem>
// 									<SelectItem value="Liechtenstein">Liechtenstein</SelectItem>
// 									<SelectItem value="Lithuania">Lithuania</SelectItem>
// 									<SelectItem value="Luxembourg">Luxembourg</SelectItem>
// 									<SelectItem value="Madagascar">Madagascar</SelectItem>
// 									<SelectItem value="Malawi">Malawi</SelectItem>
// 									<SelectItem value="Malaysia">Malaysia</SelectItem>
// 									<SelectItem value="Maldives">Maldives</SelectItem>
// 									<SelectItem value="Mali">Mali</SelectItem>
// 									<SelectItem value="Malta">Malta</SelectItem>
// 									<SelectItem value="Marshall Islands">Marshall Islands</SelectItem>
// 									<SelectItem value="Mauritania">Mauritania</SelectItem>
// 									<SelectItem value="Mauritius">Mauritius</SelectItem>
// 									<SelectItem value="Mexico">Mexico</SelectItem>
// 									<SelectItem value="Micronesia, Federated States of">Micronesia, Federated States of</SelectItem>
// 									<SelectItem value="Moldova">Moldova</SelectItem>
// 									<SelectItem value="Monaco">Monaco</SelectItem>
// 									<SelectItem value="Mongolia">Mongolia</SelectItem>
// 									<SelectItem value="Montenegro">Montenegro</SelectItem>
// 									<SelectItem value="Morocco">Morocco</SelectItem>
// 									<SelectItem value="Mozambique">Mozambique</SelectItem>
// 									<SelectItem value="Myanmar (Burma)">Myanmar (Burma)</SelectItem>
// 									<SelectItem value="Namibia">Namibia</SelectItem>
// 									<SelectItem value="Nauru">Nauru</SelectItem>
// 									<SelectItem value="Nepal">Nepal</SelectItem>
// 									<SelectItem value="Netherlands">Netherlands</SelectItem>
// 									<SelectItem value="New Zealand">New Zealand</SelectItem>
// 									<SelectItem value="Nicaragua">Nicaragua</SelectItem>
// 									<SelectItem value="Niger">Niger</SelectItem>
// 									<SelectItem value="Nigeria">Nigeria</SelectItem>
// 									<SelectItem value="North Macedonia">North Macedonia</SelectItem>
// 									<SelectItem value="Norway">Norway</SelectItem>
// 									<SelectItem value="Oman">Oman</SelectItem>
// 									<SelectItem value="Pakistan">Pakistan</SelectItem>
// 									<SelectItem value="Palau">Palau</SelectItem>
// 									<SelectItem value="Panama">Panama</SelectItem>
// 									<SelectItem value="Papua New Guinea">Papua New Guinea</SelectItem>
// 									<SelectItem value="Paraguay">Paraguay</SelectItem>
// 									<SelectItem value="Peru">Peru</SelectItem>
// 									<SelectItem value="Philippines">Philippines</SelectItem>
// 									<SelectItem value="Poland">Poland</SelectItem>
// 									<SelectItem value="Portugal">Portugal</SelectItem>
// 									<SelectItem value="Qatar">Qatar</SelectItem>
// 									<SelectItem value="Romania">Romania</SelectItem>
// 									<SelectItem value="Russia">Russia</SelectItem>
// 									<SelectItem value="Rwanda">Rwanda</SelectItem>
// 									<SelectItem value="Saint Kitts and Nevis">Saint Kitts and Nevis</SelectItem>
// 									<SelectItem value="Saint Lucia">Saint Lucia</SelectItem>
// 									<SelectItem value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</SelectItem>
// 									<SelectItem value="Samoa">Samoa</SelectItem>
// 									<SelectItem value="San Marino">San Marino</SelectItem>
// 									<SelectItem value="Sao Tome and Principe">Sao Tome and Principe</SelectItem>
// 									<SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
// 									<SelectItem value="Senegal">Senegal</SelectItem>
// 									<SelectItem value="Serbia">Serbia</SelectItem>
// 									<SelectItem value="Seychelles">Seychelles</SelectItem>
// 									<SelectItem value="Sierra Leone">Sierra Leone</SelectItem>
// 									<SelectItem value="Singapore">Singapore</SelectItem>
// 									<SelectItem value="Slovakia">Slovakia</SelectItem>
// 									<SelectItem value="Slovenia">Slovenia</SelectItem>
// 									<SelectItem value="Solomon Islands">Solomon Islands</SelectItem>
// 									<SelectItem value="Somalia">Somalia</SelectItem>
// 									<SelectItem value="South Africa">South Africa</SelectItem>
// 									<SelectItem value="Spain">Spain</SelectItem>
// 									<SelectItem value="Sri Lanka">Sri Lanka</SelectItem>
// 									<SelectItem value="Sudan">Sudan</SelectItem>
// 									<SelectItem value="Sudan, South">Sudan, South</SelectItem>
// 									<SelectItem value="Suriname">Suriname</SelectItem>
// 									<SelectItem value="Sweden">Sweden</SelectItem>
// 									<SelectItem value="Switzerland">Switzerland</SelectItem>
// 									<SelectItem value="Syria">Syria</SelectItem>
// 									<SelectItem value="Taiwan">Taiwan</SelectItem>
// 									<SelectItem value="Tajikistan">Tajikistan</SelectItem>
// 									<SelectItem value="Tanzania">Tanzania</SelectItem>
// 									<SelectItem value="Thailand">Thailand</SelectItem>
// 									<SelectItem value="Togo">Togo</SelectItem>
// 									<SelectItem value="Tonga">Tonga</SelectItem>
// 									<SelectItem value="Trinidad and Tobago">Trinidad and Tobago</SelectItem>
// 									<SelectItem value="Tunisia">Tunisia</SelectItem>
// 									<SelectItem value="Turkey">Turkey</SelectItem>
// 									<SelectItem value="Turkmenistan">Turkmenistan</SelectItem>
// 									<SelectItem value="Tuvalu">Tuvalu</SelectItem>
// 									<SelectItem value="Uganda">Uganda</SelectItem>
// 									<SelectItem value="Ukraine">Ukraine</SelectItem>
// 									<SelectItem value="United Arab Emirates">United Arab Emirates</SelectItem>
// 									<SelectItem value="United Kingdom">United Kingdom</SelectItem>
// 									<SelectItem value="United States">United States</SelectItem>
// 									<SelectItem value="Uruguay">Uruguay</SelectItem>
// 									<SelectItem value="Uzbekistan">Uzbekistan</SelectItem>
// 									<SelectItem value="Vanuatu">Vanuatu</SelectItem>
// 									<SelectItem value="Vatican City">Vatican City</SelectItem>
// 									<SelectItem value="Venezuela">Venezuela</SelectItem>
// 									<SelectItem value="Vietnam">Vietnam</SelectItem>
// 									<SelectItem value="Yemen">Yemen</SelectItem>
// 									<SelectItem value="Zambia">Zambia</SelectItem>
// 									<SelectItem value="Zimbabwe">Zimbabwe</SelectItem> 