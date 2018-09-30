package userdataaccess;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.Date;
import java.util.Optional;

import userdataaccess.User;
import userdataaccess.UserRepository;
import userdataaccess.UserNotFoundException;

@Controller
@RequestMapping(path="/userdataaccess")
public class MainController {
	@Autowired
	private UserRepository userRepository;

	@GetMapping(path="/add") // Map ONLY GET Requests
	public @ResponseBody String addUser (@RequestParam String email
            , @RequestParam String name
            , @RequestParam String idType
            , @RequestParam String idNumber
            , @RequestParam Date birthday
            , @RequestParam String state
            , @RequestParam String city
            , @RequestParam String address
            , @RequestParam String homePhone
            , @RequestParam String cellPhone) {

        User n = new User();
        n.setEmail(email);
        n.setName(name);
        n.setIdType(idType);
        n.setIdNumber(idNumber);
        n.setBirthday(birthday);
        n.setState(state);
        n.setCity(city);
        n.setAddress(address);
        n.setHomePhone(homePhone);
        n.setCellPhone(cellPhone);
		userRepository.save(n);
		return "Saved";
    }
    
    @GetMapping(path="/getUser")
    public @ResponseBody User getUser(@RequestParam String email) {
        Optional<User> optionalUser = userRepository.findById(email);
        optionalUser.orElseThrow(UserNotFoundException::new);
        return optionalUser.get();
    }
}