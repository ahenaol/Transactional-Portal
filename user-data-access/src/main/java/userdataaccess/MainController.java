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

@Controller // This means that this class is a Controller
@RequestMapping(path="/userdataaccess") // This means URL's start with /userdataaccess (after Application path)
public class MainController {
    @Autowired // This means to get the bean called userRepository
               // Which is auto-generated by Spring, we will use it to handle the dataS
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
    
    @GetMapping(path="/get")
    public @ResponseBody User getUser(@RequestParam String email) {
        Optional<User> optionalUser = userRepository.findById(email);
        optionalUser.orElseThrow(UserNotFoundException::new);
        return optionalUser.get();
    }
}