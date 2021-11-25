$("a").on("click", displayAuthorInfo);

async function displayAuthorInfo() 
{
  var myModal = new bootstrap.Modal(document.getElementById('authorModal'));
  $("#authorInfo").empty()
  myModal.show();
  let authorId = $(this).attr("id");
  let url = `/api/authorInfo?authorId=${authorId}`;
  let response = await fetch(url);
  let data = await response.json();
  let birth = data[0].dob
  let death = data[0].dod
  $(".modal-title").html(data[0].firstName + ' ');
  $(".modal-title").append(data[0].lastName);
  $("#authorInfo").append(`<img src="${data[0].portrait}" width="250"> <br>`);
  $("#authorInfo").append(`<strong>Date of Birth:</strong> ${birth.substring(0, birth.length - 14)}<br>`);
  $("#authorInfo").append(`<strong>Date of Death:</strong> ${death.substring(0, birth.length - 14)}<br>`);
  $("#authorInfo").append(`<strong>Sex:</strong> ${data[0].sex}<br>`);
  $("#authorInfo").append(`<strong>Country:</strong> ${data[0].country}<br>`);
  $("#authorInfo").append(`<strong>Profession:</strong> ${data[0].profession}<br>`);
  $("#authorInfo").append(`<strong>Biography:</strong> ${data[0].biography}<br>`);

}