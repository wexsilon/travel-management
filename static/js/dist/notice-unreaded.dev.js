/**
 * App Email
 */
'use strict';

document.addEventListener('DOMContentLoaded', function () {
  (function () {
    var emailList = document.querySelector('.email-list'),
        emailListItems = [].slice.call(document.querySelectorAll('.email-list-item')),
        emailListItemInputs = [].slice.call(document.querySelectorAll('.email-list-item-input')),
        emailView = document.querySelector('.app-email-view-content'),
        emailFilters = document.querySelector('.email-filters'),
        emailFilterByFolders = [].slice.call(document.querySelectorAll('.email-filter-folders li')),
        emailEditor = document.querySelector('.email-editor'),
        appEmailSidebar = document.querySelector('.app-email-sidebar'),
        appOverlay = document.querySelector('.app-overlay'),
        emailReplyEditor = document.querySelector('.email-reply-editor'),
        bookmarkEmail = [].slice.call(document.querySelectorAll('.email-list-item-bookmark')),
        selectAllEmails = document.getElementById('email-select-all'),
        emailSearch = document.querySelector('.email-search-input'),
        toggleCC = document.querySelector('.email-compose-toggle-cc'),
        toggleBCC = document.querySelector('.email-compose-toggle-bcc'),
        emailCompose = document.querySelector('.app-email-compose'),
        emailListDelete = document.querySelector('.email-list-delete'),
        hiddenInput = document.getElementById('htmlContent'),
        emailListRead = document.querySelector('.email-list-read'),
        refreshEmails = document.querySelector('.email-refresh'),
        emailViewContainer = document.getElementById('app-email-view'),
        emailFilterFolderLists = [].slice.call(document.querySelectorAll('.email-filter-folders li')),
        emailListItemActions = [].slice.call(document.querySelectorAll('.email-list-item-actions li')); // Initialize PerfectScrollbar
    // ------------------------------
    // Email list scrollbar

    if (emailList) {
      var emailListInstance = new PerfectScrollbar(emailList, {
        wheelPropagation: false,
        suppressScrollX: true
      });
    } // Sidebar tags scrollbar


    if (emailFilters) {
      new PerfectScrollbar(emailFilters, {
        wheelPropagation: false,
        suppressScrollX: true
      });
    } // Email view scrollbar


    if (emailView) {
      new PerfectScrollbar(emailView, {
        wheelPropagation: false,
        suppressScrollX: true
      });
    } // Initialize Quill Editor
    // ------------------------------


    if (emailEditor) {
      var quill = new Quill('.email-editor', {
        modules: {
          toolbar: '.email-editor-toolbar'
        },
        placeholder: 'پیام خود را بنویسید ... ',
        theme: 'snow'
      });
      quill.on('text-change', function () {
        var justHtml = quill.root.innerHTML;
        hiddenInput.value = justHtml;
      });
    } // Select all


    if (selectAllEmails) {
      selectAllEmails.addEventListener('click', function (e) {
        if (e.currentTarget.checked) {
          emailListItemInputs.forEach(function (c) {
            return c.checked = 1;
          });
        } else {
          emailListItemInputs.forEach(function (c) {
            return c.checked = 0;
          });
        }
      });
    } // Select single email


    if (emailListItemInputs) {
      emailListItemInputs.forEach(function (emailListItemInput) {
        emailListItemInput.addEventListener('click', function (e) {
          e.stopPropagation(); // Check input count to reset the indeterminate state

          var emailListItemInputCount = 0;
          emailListItemInputs.forEach(function (emailListItemInput) {
            if (emailListItemInput.checked) {
              emailListItemInputCount++;
            }
          });

          if (emailListItemInputCount < emailListItemInputs.length) {
            if (emailListItemInputCount == 0) {
              selectAllEmails.indeterminate = false;
            } else {
              selectAllEmails.indeterminate = true;
            }
          } else {
            if (emailListItemInputCount == emailListItemInputs.length) {
              selectAllEmails.indeterminate = false;
              selectAllEmails.checked = true;
            } else {
              selectAllEmails.indeterminate = false;
            }
          }
        });
      });
    } // Search email based on searched text


    if (emailSearch) {
      emailSearch.addEventListener('keyup', function (e) {
        var searchValue = e.currentTarget.value.toLowerCase(),
            searchEmailListItems = {},
            selectedFolderFilter = document.querySelector('.email-filter-folders .active').getAttribute('data-target'); // Filter emails based on selected folders

        if (selectedFolderFilter != 'inbox') {
          searchEmailListItems = [].slice.call(document.querySelectorAll('.email-list-item[data-' + selectedFolderFilter + '="true"]'));
        } else {
          searchEmailListItems = [].slice.call(document.querySelectorAll('.email-list-item'));
        } // console.log(searchValue);


        searchEmailListItems.forEach(function (searchEmailListItem) {
          var searchEmailListItemText = searchEmailListItem.textContent.toLowerCase();

          if (searchValue) {
            if (-1 < searchEmailListItemText.indexOf(searchValue)) {
              searchEmailListItem.classList.add('d-block');
            } else {
              searchEmailListItem.classList.add('d-none');
            }
          } else {
            searchEmailListItem.classList.remove('d-none');
          }
        });
      });
    } // Filter based on folder type (Inbox, Sent, Draft etc...)
    // emailFilterByFolders.forEach(emailFilterByFolder => {
    //   emailFilterByFolder.addEventListener('click', e => {
    //     let currentTarget = e.currentTarget,
    //       currentTargetData = currentTarget.getAttribute('data-target');
    //     appEmailSidebar.classList.remove('show');
    //     appOverlay.classList.remove('show');
    //     // Remove active class from each folder filters
    //     Helpers._removeClass('active', emailFilterByFolders);
    //     // Add active class to selected folder filters
    //     currentTarget.classList.add('active');
    //     emailListItems.forEach(emailListItem => {
    //       // If folder filter is Inbox
    //       if (currentTargetData == 'inbox') {
    //         emailListItem.classList.add('d-block');
    //         emailListItem.classList.remove('d-none');
    //       } else if (emailListItem.hasAttribute('data-' + currentTargetData)) {
    //         emailListItem.classList.add('d-block');
    //         emailListItem.classList.remove('d-none');
    //       } else {
    //         emailListItem.classList.add('d-none');
    //         emailListItem.classList.remove('d-block');
    //       }
    //     });
    //   });
    // });
    // Empty compose email message inputs when modal is hidden


    emailCompose.addEventListener('hidden.bs.modal', function (event) {
      document.querySelector('.email-editor .ql-editor').innerHTML = '';
      $('#emailContacts').val('');
      initSelect2();
    }); // Delete multiple email

    if (emailListDelete) {
      emailListDelete.addEventListener('click', function (e) {
        var listSelectNotice = [];
        emailListItemInputs.forEach(function (emailListItemInput) {
          if (emailListItemInput.checked) {
            listSelectNotice.push(emailListItemInput.value); // emailListItemInput.parentNode.closest('li.email-list-item').remove();
          }
        });
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
          if (this.readyState == XMLHttpRequest.DONE) {
            window.location = "/notice/unreaded";
          }
        };

        xhr.open('DELETE', '/notice/delete', true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify({
          ids: listSelectNotice
        })); // selectAllEmails.indeterminate = false;
        // selectAllEmails.checked = false;
      });
    } // Mark as read


    if (emailListRead) {
      emailListRead.addEventListener('click', function (e) {
        var listSelectNotice = [];
        emailListItemInputs.forEach(function (emailListItemInput) {
          if (emailListItemInput.checked) {
            listSelectNotice.push(emailListItemInput.value);
          }
        });
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
          if (this.readyState == XMLHttpRequest.DONE) {
            window.location = "/notice/unreaded";
          }
        };

        xhr.open('PATCH', '/notice/read', true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify({
          ids: listSelectNotice
        })); // selectAllEmails.indeterminate = false;
        // selectAllEmails.checked = false;
      });
    }

    var emailViewContent = $('.app-email-view-content');
    emailViewContent.find('.scroll-to-reply').on('click', function () {
      if (emailViewContent[0].scrollTop === 0) {
        emailViewContent.animate({
          scrollTop: emailViewContent[0].scrollHeight
        }, 1500);
      }
    }); // Close view on email filter folder list click

    if (emailFilterFolderLists) {
      emailFilterFolderLists.forEach(function (emailFilterFolderList) {
        emailFilterFolderList.addEventListener('click', function (e) {
          emailViewContainer.classList.remove('show');
        });
      });
    } // Email List Items Actions


    if (emailListItemActions) {
      emailListItemActions.forEach(function (emailListItemAction) {
        emailListItemAction.addEventListener('click', function (e) {
          e.stopPropagation(); //   let currentTarget = e.currentTarget;
          //   if (Helpers._hasClass('email-delete', currentTarget)) {
          //     currentTarget.parentNode.closest('li.email-list-item').remove();
          //   } else if (Helpers._hasClass('email-read', currentTarget)) {
          //     currentTarget.parentNode.closest('li.email-list-item').classList.add('email-marked-read');
          //     Helpers._toggleClass(currentTarget, 'email-read', 'email-unread');
          //     Helpers._toggleClass(currentTarget.querySelector('i'), 'bx-envelope-open', 'bx-envelope');
          //   } else if (Helpers._hasClass('email-unread', currentTarget)) {
          //     currentTarget.parentNode.closest('li.email-list-item').classList.remove('email-marked-read');
          //     Helpers._toggleClass(currentTarget, 'email-read', 'email-unread');
          //     Helpers._toggleClass(currentTarget.querySelector('i'), 'bx-envelope-open', 'bx-envelope');
          //   }
        });
      });
    }
  })();
});