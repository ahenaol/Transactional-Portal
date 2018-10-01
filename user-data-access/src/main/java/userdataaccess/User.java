package userdataaccess;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Column;
import java.sql.Date;

@Entity // This tells Hibernate to make a table out of this class
public class User {
	@Id
	@Column(length = 64)
	private String email;
	@Column(length = 64)
	private String name;
	@Column(length = 8)
	private String idType;
	@Column(length = 16)
	private String idNumber;
	private Date birthday;
	@Column(length = 16)
	private String state;
	@Column(length = 16)
	private String city;
	@Column(length = 64)
	private String address;
	@Column(length = 16)
	private String homePhone;
	@Column(length = 16)
	private String cellPhone;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getIdType() {
		return idType;
	}

	public void setIdType(String idType) {
		this.idType = idType;
	}

	public String getIdNumber() {
		return idNumber;
	}

	public void setIdNumber(String idNumber) {
		this.idNumber = idNumber;
	}

	public Date getBirthday() {
		return birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getHomePhone() {
		return homePhone;
	}

	public void setHomePhone(String homePhone) {
		this.homePhone = homePhone;
	}

	public String getCellPhone() {
		return cellPhone;
	}

	public void setCellPhone(String cellPhone) {
		this.cellPhone = cellPhone;
	}
}